# [patwoz.dev](https://patwoz.dev)

![](https://api.checklyhq.com/v1/badges/checks/a3af39a2-0e2d-44b5-a238-31a84f4a27cd?style=flat&theme=default&responseTime=true) [![validate](https://github.com/patlux/patwoz-de/actions/workflows/validate.yml/badge.svg?branch=main)](https://github.com/patlux/patwoz-de/actions/workflows/validate.yml) [![deploy](https://github.com/patlux/patwoz-de/actions/workflows/deploy.yml/badge.svg?branch=main)](https://github.com/patlux/patwoz-de/actions/workflows/deploy.yml) ![GitHub repo size](https://img.shields.io/github/repo-size/patlux/patwoz-de)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)
![Twitter Follow](https://img.shields.io/twitter/follow/de_patwoz?style=social)

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

### Validate (format, types, build)

```sh
bun run validate
```

## Contact

If you want to contact me you can reach me at <hi@patwoz.de>.

## License

MIT
