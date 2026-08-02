# [patwoz.dev](https://patwoz.dev)

![](https://api.checklyhq.com/v1/badges/checks/a3af39a2-0e2d-44b5-a238-31a84f4a27cd?style=flat&theme=default&responseTime=true) [![validate](https://github.com/patlux/patwoz-de/actions/workflows/validate.yml/badge.svg?branch=main)](https://github.com/patlux/patwoz-de/actions/workflows/validate.yml) [![deploy](https://github.com/patlux/patwoz-de/actions/workflows/deploy.yml/badge.svg?branch=main)](https://github.com/patlux/patwoz-de/actions/workflows/deploy.yml) ![GitHub repo size](https://img.shields.io/github/repo-size/patlux/patwoz-de)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)
![X Follow](https://img.shields.io/twitter/follow/patwoz?style=social)

My personal website and blog.

## Tech Stack

- [Astro](https://astro.build/): Static site generator
- [Bun](https://bun.sh/): Package manager & runtime
- [Tailwind CSS](https://tailwindcss.com/): Styling
- [MDX](https://mdxjs.com/): Blog content
- [Cloudflare Pages](https://pages.cloudflare.com/): Hosting
- [Playwright](https://playwright.dev/): E2E testing
- [Checkly](https://www.checklyhq.com/): Monitoring
- [Prettier](https://prettier.io/): Code formatting
- [ESLint](https://eslint.org/): Linting

## Development

Install dependencies:

```sh
bun install
```

### Start dev server

```sh
bun run dev
```

### Deploy to production

```sh
bun run deploy
```

### Run tests

```sh
bun run test
```

### Run E2E tests

```sh
bun run test:e2e
```

### Validate (format, lint, types, build, tests)

```sh
bun run validate
bun run test:e2e
```

## Contact form architecture

The website remains a statically generated Astro/Cloudflare Pages site. `/contact`
and `/de/contact` post JSON to a separate Worker route at `/api/contact`; no Astro
server route is introduced.

The Worker lives in `contact-worker/` and uses:

- Cloudflare Turnstile with mandatory server-side Siteverify validation, including
  exact `patwoz.dev` hostname and `contact` action checks.
- Cloudflare Email Service's native `send_email` binding. Sender and recipient are
  fixed to `contact-form@contact.patwoz.dev` and `hi@patwoz.de`; the visitor address is
  only `Reply-To`.
- Cloudflare's Rate Limiting binding (five accepted attempts per 60 seconds per
  hashed IP-derived request key and Cloudflare location). The hash is used only
  as the binding key and is not logged or stored by the application. The API is permissive/eventually
  consistent and is not an accounting system.
- No database, queue, upload, auto-reply, or other persistent submission storage.
  Logs contain fixed event names only and must not contain form fields, bodies,
  tokens, or full IP addresses.

### Local development and tests

`bun run dev` starts both Astro on `http://127.0.0.1:5174` and the dedicated
Worker on `http://127.0.0.1:8787`; Astro proxies `/api/contact` to the Worker.
The fixed site port avoids Astro silently selecting another port when unrelated
local projects are already running.
The local environment uses Cloudflare's published always-pass Turnstile test
sitekey and secret. Wrangler's local Email binding simulates delivery rather
than sending production mail. Do not put production secrets in repository
files. The production Worker secret is configured as the `TURNSTILE_SECRET_KEY`
Cloudflare secret. Unit tests mock Email Service, Rate Limiting and Siteverify;
Playwright mocks `/api/contact` and the client widget.

```sh
bun run dev
bun test contact-worker/src/index.test.ts
bun run test:e2e -- tests/e2e/contact.e2e.ts
```

Real Email Service delivery, the production Turnstile widget, and the distributed
rate limiter cannot be proven by local mocks. Use Cloudflare's test keys only in
non-production environments.

### Cloudflare prerequisites

Before deployment, verify in the intended Cloudflare account rather than creating
or changing resources blindly:

1. The isolated `contact.patwoz.dev` subdomain is onboarded for Email Service
   sending and `contact-form@contact.patwoz.dev` is an allowed sender. Manage
   its DNS records declaratively in `/Users/patwoz/dev/Personal/infra`; do not
   modify the existing root-domain, SES, mailbox, or Netflix mail records.
2. `hi@patwoz.de` is a verified Email Service destination.
3. A Turnstile widget exists with hostname `patwoz.dev`. Its public sitekey is
   the production fallback in `ContactForm.astro` and may be overridden with
   `PUBLIC_TURNSTILE_SITE_KEY` at build time. The secret stays only in the
   Worker's `TURNSTILE_SECRET_KEY` binding.
4. The Worker route is exactly `patwoz.dev/api/contact`; confirm it does not
   shadow other Pages routes.
5. The `CONTACT_RATE_LIMITER` namespace ID is unique within the account. Wrangler
   4.36.0 or newer is required for this binding.

### Deployment order and smoke test

1. Deploy the Worker and secret/bindings first. Do not deploy from this repository
   without an explicit request and reviewed Cloudflare access.
2. Test the Worker route with invalid method, content type and Origin requests;
   expect generic no-store JSON errors and no email.
3. Build and deploy the static Pages site with the production Turnstile sitekey.
4. From both `/contact` and `/de/contact`, submit one real inquiry using a unique
   subject/body marker. Confirm the success state, one delivered plain-text email,
   fixed From/To, correct Reply-To, and no auto-reply.
5. Confirm failed/expired Turnstile, honeypot and repeated submissions do not send
   mail. Inspect Worker logs and verify they show event names only, without the
   marker, email address, body, token, or full IP address.
6. Check mobile/desktop, light/dark mode, keyboard-only flow, privacy links, and
   the visible `hi@patwoz.de` fallback in both languages.

### Rollback

Roll back the Pages deployment first if the UI is faulty. If the API is faulty,
remove or roll back only the dedicated Worker route/version; the static site and
visible mailto fallback continue to work. Do not alter DNS, MX, Email Routing, or
other Cloudflare resources as a rollback shortcut. Revoke/rotate the Turnstile
secret if exposure is suspected.

The privacy-page wording describes intended technical behavior, not legal
certainty. It requires legal review before production activation, including
provider contracts, transfer safeguards, and actual Cloudflare/mail retention.

## Contact

If you want to contact me you can reach me at <hi@patwoz.de>.

## License

MIT
