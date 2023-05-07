# [patwoz.de](https://patwoz.de)

![](https://api.checklyhq.com/v1/badges/checks/a3af39a2-0e2d-44b5-a238-31a84f4a27cd?style=flat&theme=default&responseTime=true) [![validate](https://github.com/patlux/patwoz-de/actions/workflows/validate.yml/badge.svg?branch=main)](https://github.com/patlux/patwoz-de/actions/workflows/validate.yml) [![deploy](https://github.com/patlux/patwoz-de/actions/workflows/deploy.yml/badge.svg?branch=main)](https://github.com/patlux/patwoz-de/actions/workflows/deploy.yml) ![GitHub repo size](https://img.shields.io/github/repo-size/patlux/patwoz-de)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)
![Twitter Follow](https://img.shields.io/twitter/follow/de_patwoz?style=social)

My personal website.

Technologies used:

- [bun](https://bun.sh/): Bundler/Transpiler & Package manager
- [remix](https://remix.run): full stack web framework
- [tailwindcss](https://tailwindcss.com/): styling
- [playwright](https://playwright.dev/): End-To-End Tests
- [prettier](https://prettier.io/): Formatting code ([My config](https://github.com/patlux/prettier-config))
- [eslint](https://eslint.org/): Lint code
- [sqlite](https://github.com/oven-sh/bun#bunsqlite-sqlite3-module): sql database

## Development

Install dependencies:

```sh
$ bun install
```

### Start dev server

```sh
$ bun run dev
```

### Deploy to production

```sh
$ fly deploy
```

### Run tests

```sh
$ bun run test
```

### Run End-To-End Tests

```sh
$ bun run test:e2e
```

### Checkly

**deploy**

```sh
bunx checkly deploy
```

## Contact

If you want to contact me you can reach me at <email@patwoz.de>.

## License

MIT
