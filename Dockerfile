ARG BUN_VERSION=0.7.3

FROM oven/bun:${BUN_VERSION} as deps

WORKDIR /app

COPY package.json bun.lockb ./
RUN echo "[install]\noptional = false\ndev = true\npeer = false" >> bunfig.toml
RUN bun install --ignore-scripts

FROM node:18-bullseye-slim as remix

WORKDIR /app

COPY --from=deps /usr/local/bin/bun /bin/bun
COPY --from=deps /app/node_modules /app/node_modules

COPY app app
COPY public public
ADD tailwind.config.js tailwind.config.js
ADD remix.env.d.ts remix.env.d.ts
ADD remix.config.js remix.config.js
ADD package.json package.json
ADD tsconfig.json tsconfig.json

RUN bun run build:remix
RUN [ -f "/app/build/index.js" ] && exit 0 || exit 1 

FROM oven/bun:${BUN_VERSION} as server

WORKDIR /app/

COPY --from=deps /usr/local/bin/bun /usr/local/bin/bun

COPY --from=remix /app/build /app/build
COPY --from=remix /app/public /app/public

COPY --from=deps /app/node_modules /app/node_modules

COPY package.json bun.lockb tsconfig.json server.ts remix.config.js remix.env.d.ts tailwind.config.js ./

COPY . .

RUN bun build server.ts --minify --outfile server.js --target bun --external ./build
RUN [ -f "/app/server.js" ] && exit 0 || exit 1 

FROM oven/bun:${BUN_VERSION} as prod

WORKDIR /app

COPY --from=deps /app/node_modules /app/node_modules 

# remix build
COPY --from=remix /app/build /app/build
COPY --from=remix /app/public /app/public

COPY --from=server /app/server.js /app/server.js
ADD tsconfig.json tsconfig.json

EXPOSE 3000
CMD ["bun", "run", "/app/server.js"]
