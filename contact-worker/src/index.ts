const EXPECTED_ORIGIN = 'https://patwoz.dev'
const EXPECTED_HOSTNAME = 'patwoz.dev'
const EXPECTED_ACTION = 'contact'
const MAX_BODY_BYTES = 8 * 1024
const TURNSTILE_URL =
  'https://challenges.cloudflare.com/turnstile/v0/siteverify'
const EMAIL_TO = 'hi@patwoz.de'
const EMAIL_FROM = 'contact-form@contact.patwoz.dev'

const categories = [
  'new-project',
  'existing-project',
  'consulting',
  'other',
] as const
const desiredStarts = ['asap', 'one-three-months', 'later', 'flexible'] as const
const collaborationTypes = [
  'project',
  'fractional',
  'consulting',
  'open',
] as const
const budgets = ['under-10k', '10k-25k', '25k-50k', 'over-50k', 'open'] as const
const allowedKeys = new Set([
  'name',
  'email',
  'company',
  'category',
  'description',
  'desiredStart',
  'collaborationType',
  'budget',
  'projectLink',
  'website',
  'turnstileToken',
])

type Category = (typeof categories)[number]
type DesiredStart = (typeof desiredStarts)[number]
type CollaborationType = (typeof collaborationTypes)[number]
type Budget = (typeof budgets)[number]

interface ContactData {
  name: string
  email: string
  company: string
  category: Category
  description: string
  desiredStart: DesiredStart | ''
  collaborationType: CollaborationType | ''
  budget: Budget | ''
  projectLink: string
  website: string
  turnstileToken: string
}

interface EmailBinding {
  send(message: {
    to: string
    from: string
    subject: string
    text: string
    replyTo: string
  }): Promise<{ messageId: string }>
}

interface RateLimiter {
  limit(options: { key: string }): Promise<{ success: boolean }>
}

export interface Env {
  EMAIL: EmailBinding
  CONTACT_RATE_LIMITER?: RateLimiter
  TURNSTILE_SECRET_KEY: string
  EXPECTED_ORIGIN?: string
  EXPECTED_REQUEST_ORIGIN?: string
  EXPECTED_HOSTNAME?: string
  LOCAL_DEVELOPMENT?: string
}

const responseHeaders = {
  'Cache-Control': 'no-store',
  'Content-Type': 'application/json; charset=utf-8',
  'X-Content-Type-Options': 'nosniff',
}

const json = (status: number, ok: boolean) =>
  new Response(JSON.stringify({ ok }), { status, headers: responseHeaders })

const cleanString = (value: unknown, max: number) =>
  typeof value === 'string' && value.length <= max ? value.trim() : null

const hasHeaderBreak = (value: string) => /[\r\n]/.test(value)
const isEmail = (value: string) =>
  value.length <= 254 &&
  !hasHeaderBreak(value) &&
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)

const isOneOf = <T extends string>(
  value: string,
  options: readonly T[],
): value is T => options.some((option) => option === value)

const parseBody = (input: unknown): ContactData | null => {
  if (typeof input !== 'object' || input === null || Array.isArray(input))
    return null
  const record = Object.fromEntries(Object.entries(input))
  if (Object.keys(record).some((key) => !allowedKeys.has(key))) return null

  const name = cleanString(record.name, 100)
  const email = cleanString(record.email, 254)
  const company = cleanString(record.company ?? '', 120)
  const category = cleanString(record.category, 40)
  const description = cleanString(record.description, 4000)
  const desiredStart = cleanString(record.desiredStart ?? '', 40)
  const collaborationType = cleanString(record.collaborationType ?? '', 40)
  const budget = cleanString(record.budget ?? '', 40)
  const projectLink = cleanString(record.projectLink ?? '', 2048)
  const website = cleanString(record.website ?? '', 200)
  const turnstileToken = cleanString(record.turnstileToken, 2048)

  if (
    name === null ||
    name.length < 1 ||
    hasHeaderBreak(name) ||
    email === null ||
    !isEmail(email) ||
    company === null ||
    hasHeaderBreak(company) ||
    category === null ||
    !isOneOf(category, categories) ||
    description === null ||
    description.length < 20 ||
    desiredStart === null ||
    (desiredStart !== '' && !isOneOf(desiredStart, desiredStarts)) ||
    collaborationType === null ||
    (collaborationType !== '' &&
      !isOneOf(collaborationType, collaborationTypes)) ||
    budget === null ||
    (budget !== '' && !isOneOf(budget, budgets)) ||
    projectLink === null ||
    website === null ||
    turnstileToken === null ||
    turnstileToken.length < 1
  )
    return null

  if (projectLink !== '') {
    try {
      const url = new URL(projectLink)
      if (url.protocol !== 'http:' && url.protocol !== 'https:') return null
    } catch {
      return null
    }
  }

  return {
    name,
    email,
    company,
    category,
    description,
    desiredStart,
    collaborationType,
    budget,
    projectLink,
    website,
    turnstileToken,
  }
}

const verifyTurnstile = async (
  data: ContactData,
  secret: string,
  remoteIp: string,
  expectedHostname: string,
) => {
  const body = new FormData()
  body.set('secret', secret)
  body.set('response', data.turnstileToken)
  if (remoteIp) body.set('remoteip', remoteIp)

  try {
    const response = await fetch(TURNSTILE_URL, { method: 'POST', body })
    if (!response.ok) return false
    const result: unknown = await response.json()
    if (typeof result !== 'object' || result === null) return false
    const verification = Object.fromEntries(Object.entries(result))
    return (
      verification.success === true &&
      verification.hostname === expectedHostname &&
      verification.action === EXPECTED_ACTION
    )
  } catch {
    return false
  }
}

const makeRateKey = async (request: Request) => {
  const ip = request.headers.get('CF-Connecting-IP') ?? 'unknown'
  const digest = await crypto.subtle.digest(
    'SHA-256',
    new TextEncoder().encode(ip),
  )
  return Array.from(new Uint8Array(digest).slice(0, 12), (byte) =>
    byte.toString(16).padStart(2, '0'),
  ).join('')
}

const makeMessage = (data: ContactData) => {
  const lines = [
    'New project inquiry from patwoz.dev',
    '',
    `Name: ${data.name}`,
    `Email: ${data.email}`,
    `Company: ${data.company || '—'}`,
    `Category: ${data.category}`,
    `Desired start: ${data.desiredStart || '—'}`,
    `Collaboration type: ${data.collaborationType || '—'}`,
    `Budget: ${data.budget || '—'}`,
    `Project link: ${data.projectLink || '—'}`,
    '',
    'Description:',
    data.description,
  ]
  return lines.join('\n')
}

export const handleRequest = async (request: Request, env: Env) => {
  const url = new URL(request.url)
  if (url.pathname !== '/api/contact') return json(404, false)
  if (request.method !== 'POST') return json(405, false)
  const expectedOrigin = env.EXPECTED_ORIGIN ?? EXPECTED_ORIGIN
  const expectedRequestOrigin = env.EXPECTED_REQUEST_ORIGIN
  if (env.LOCAL_DEVELOPMENT !== 'true') {
    if (request.headers.get('Origin') !== expectedOrigin)
      return json(403, false)
    if (
      expectedRequestOrigin === undefined
        ? url.origin !== EXPECTED_ORIGIN
        : !expectedRequestOrigin.split(',').includes(url.origin)
    )
      return json(403, false)
  }

  const contentType = request.headers
    .get('Content-Type')
    ?.split(';', 1)[0]
    .trim()
    .toLowerCase()
  if (contentType !== 'application/json') return json(415, false)
  const declaredLength = Number(request.headers.get('Content-Length') ?? '0')
  if (Number.isFinite(declaredLength) && declaredLength > MAX_BODY_BYTES)
    return json(413, false)

  let rawBody: string
  try {
    rawBody = await request.text()
  } catch {
    return json(400, false)
  }
  if (new TextEncoder().encode(rawBody).byteLength > MAX_BODY_BYTES)
    return json(413, false)

  let parsed: unknown
  try {
    parsed = JSON.parse(rawBody)
  } catch {
    return json(400, false)
  }
  const data = parseBody(parsed)
  if (data === null) return json(400, false)

  if (data.website !== '') {
    console.info(JSON.stringify({ event: 'contact_honeypot' }))
    return json(200, true)
  }

  if (env.CONTACT_RATE_LIMITER) {
    const rate = await env.CONTACT_RATE_LIMITER.limit({
      key: await makeRateKey(request),
    })
    if (!rate.success) {
      console.info(JSON.stringify({ event: 'contact_rate_limited' }))
      return json(429, false)
    }
  }

  const verified = await verifyTurnstile(
    data,
    env.TURNSTILE_SECRET_KEY,
    request.headers.get('CF-Connecting-IP') ?? '',
    env.EXPECTED_HOSTNAME ?? EXPECTED_HOSTNAME,
  )
  if (!verified) {
    console.info(JSON.stringify({ event: 'contact_verification_failed' }))
    return json(400, false)
  }

  try {
    await env.EMAIL.send({
      to: EMAIL_TO,
      from: EMAIL_FROM,
      replyTo: data.email,
      subject: `Project inquiry: ${data.category}`,
      text: makeMessage(data),
    })
    console.info(JSON.stringify({ event: 'contact_sent' }))
    return json(200, true)
  } catch {
    console.error(JSON.stringify({ event: 'contact_send_failed' }))
    return json(500, false)
  }
}

export default {
  fetch(request: Request, env: Env) {
    return handleRequest(request, env)
  },
}
