import { afterEach, beforeEach, describe, expect, mock, test } from 'bun:test'
import { handleRequest, type Env } from './index'

const originalFetch = globalThis.fetch
const originalInfo = console.info
const originalError = console.error

const validBody = {
  name: 'Ada Lovelace',
  email: 'ada@example.com',
  company: 'Analytical Engines',
  category: 'new-project',
  description: 'A sufficiently detailed project description for validation.',
  desiredStart: 'flexible',
  collaborationType: 'project',
  budget: 'open',
  projectLink: 'https://example.com/brief',
  website: '',
  turnstileToken: 'test-token',
}

const request = (body: unknown = validBody, init: RequestInit = {}) =>
  new Request('https://patwoz.dev/api/contact', {
    method: 'POST',
    headers: {
      Origin: 'https://patwoz.dev',
      'Content-Type': 'application/json',
      'CF-Connecting-IP': '203.0.113.42',
      ...init.headers,
    },
    body: JSON.stringify(body),
    ...init,
  })

const makeEnv = () => {
  const sent: Array<Record<string, unknown>> = []
  const env: Env = {
    TURNSTILE_SECRET_KEY: 'test-secret',
    EMAIL: {
      async send(message) {
        sent.push(message)
        return { messageId: 'message-1' }
      },
    },
    CONTACT_RATE_LIMITER: {
      async limit() {
        return { success: true }
      },
    },
  }
  return { env, sent }
}

beforeEach(() => {
  globalThis.fetch = mock(async () =>
    Response.json({ success: true, hostname: 'patwoz.dev', action: 'contact' }),
  )
})

afterEach(() => {
  globalThis.fetch = originalFetch
  console.info = originalInfo
  console.error = originalError
  mock.restore()
})

describe('contact Worker', () => {
  test('sends plain text with fixed sender/recipient and visitor Reply-To', async () => {
    const { env, sent } = makeEnv()
    const response = await handleRequest(request(), env)

    expect(response.status).toBe(200)
    expect(response.headers.get('Cache-Control')).toBe('no-store')
    expect(await response.json()).toEqual({ ok: true })
    expect(sent).toHaveLength(1)
    expect(sent[0]).toMatchObject({
      to: 'hi@patwoz.de',
      from: 'contact-form@contact.patwoz.dev',
      replyTo: 'ada@example.com',
      subject: 'Project inquiry: new-project',
    })
    expect(sent[0]?.text).toContain(
      'A sufficiently detailed project description',
    )
  })

  test.each([
    ['method', new Request('https://patwoz.dev/api/contact'), 405],
    [
      'path',
      new Request('https://patwoz.dev/api/other', { method: 'POST' }),
      404,
    ],
    [
      'origin',
      request(validBody, {
        headers: {
          Origin: 'https://evil.example',
          'Content-Type': 'application/json',
        },
      }),
      403,
    ],
    [
      'content type',
      request(validBody, {
        headers: { Origin: 'https://patwoz.dev', 'Content-Type': 'text/plain' },
      }),
      415,
    ],
  ])('rejects invalid %s', async (_name, invalidRequest, status) => {
    const { env } = makeEnv()
    const response = await handleRequest(invalidRequest, env)
    expect(response.status).toBe(status)
    expect(response.headers.get('Cache-Control')).toBe('no-store')
  })

  test('keeps production Origin and request-host checks enabled', async () => {
    const { env } = makeEnv()
    env.LOCAL_DEVELOPMENT = 'true'
    env.EXPECTED_ORIGIN = 'http://127.0.0.1:5174'
    const localRequest = new Request('http://127.0.0.1:8787/api/contact', {
      method: 'POST',
      headers: {
        Origin: 'http://127.0.0.1:5174',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...validBody, website: 'bot' }),
    })
    expect((await handleRequest(localRequest, env)).status).toBe(200)

    delete env.LOCAL_DEVELOPMENT
    expect((await handleRequest(localRequest, env)).status).toBe(403)
  })

  test('rejects oversized declared and actual bodies', async () => {
    const { env } = makeEnv()
    const declared = request(validBody, {
      headers: {
        Origin: 'https://patwoz.dev',
        'Content-Type': 'application/json',
        'Content-Length': '9000',
      },
    })
    expect((await handleRequest(declared, env)).status).toBe(413)

    const actual = request({ ...validBody, description: 'x'.repeat(8200) })
    expect((await handleRequest(actual, env)).status).toBe(413)
  })

  test.each([
    [{ ...validBody, unexpected: true }, 'unknown input'],
    [{ ...validBody, category: 'invalid' }, 'enum'],
    [{ ...validBody, name: 'a'.repeat(101) }, 'limit'],
    [
      { ...validBody, email: 'ada@example.com\r\nBcc: victim@example.com' },
      'header injection',
    ],
    [{ ...validBody, projectLink: 'javascript:alert(1)' }, 'URL protocol'],
  ])('rejects %s validation failure', async (body) => {
    const { env, sent } = makeEnv()
    const response = await handleRequest(request(body), env)
    expect(response.status).toBe(400)
    expect(sent).toHaveLength(0)
  })

  test('accepts honeypot without verification or email', async () => {
    const { env, sent } = makeEnv()
    const fetchMock = mock(async () => Response.json({ success: false }))
    globalThis.fetch = fetchMock
    const response = await handleRequest(
      request({ ...validBody, website: 'spam' }),
      env,
    )
    expect(response.status).toBe(200)
    expect(fetchMock).not.toHaveBeenCalled()
    expect(sent).toHaveLength(0)
  })

  test('enforces rate limiting before Turnstile', async () => {
    const { env, sent } = makeEnv()
    env.CONTACT_RATE_LIMITER = {
      async limit() {
        return { success: false }
      },
    }
    const fetchMock = mock(async () => Response.json({ success: true }))
    globalThis.fetch = fetchMock
    const response = await handleRequest(request(), env)
    expect(response.status).toBe(429)
    expect(fetchMock).not.toHaveBeenCalled()
    expect(sent).toHaveLength(0)
  })

  test.each([
    [{ success: false }, 'failed token'],
    [
      { success: true, hostname: 'evil.example', action: 'contact' },
      'hostname',
    ],
    [{ success: true, hostname: 'patwoz.dev', action: 'login' }, 'action'],
  ])('rejects Turnstile %s mismatch', async (verification) => {
    const { env, sent } = makeEnv()
    globalThis.fetch = mock(async () => Response.json(verification))
    const response = await handleRequest(request(), env)
    expect(response.status).toBe(400)
    expect(sent).toHaveLength(0)
  })

  test('returns a generic error if email delivery fails', async () => {
    const { env } = makeEnv()
    env.EMAIL = {
      async send() {
        throw new Error('private provider detail')
      },
    }
    const response = await handleRequest(request(), env)
    expect(response.status).toBe(500)
    expect(await response.json()).toEqual({ ok: false })
  })

  test('logs only fixed event names', async () => {
    const { env } = makeEnv()
    const info = mock(() => undefined)
    const error = mock(() => undefined)
    console.info = info
    console.error = error
    await handleRequest(request(), env)
    expect(info).toHaveBeenCalledWith('{"event":"contact_sent"}')
    expect(JSON.stringify(info.mock.calls)).not.toContain('ada@example.com')
    expect(JSON.stringify(info.mock.calls)).not.toContain('203.0.113.42')
    expect(error).not.toHaveBeenCalled()
  })
})
