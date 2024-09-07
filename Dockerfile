ARG BUN_VERSION=1.1.26

FROM oven/bun:${BUN_VERSION} AS bun

FROM rust:latest AS rsbuilder

RUN curl https://rustwasm.github.io/wasm-pack/installer/init.sh -sSf | sh
RUN rustup target add wasm32-unknown-emscripten

COPY --from=bun /usr/local/bin/bun /bin/bun

WORKDIR /app
COPY packages/barcode .
RUN bun install
RUN bun run build

# Install packages

FROM oven/bun:${BUN_VERSION} AS deps

WORKDIR /app

COPY package.json bun.lockb ./
COPY packages/barcode/package.json ./packages/barcode/
RUN echo "[install]\noptional = false\ndev = true\npeer = false" >> bunfig.toml
RUN bun install --ignore-scripts

# Build remix application

FROM node:18-bullseye-slim AS remix

WORKDIR /app

COPY --from=deps /usr/local/bin/bun /bin/bun
COPY --from=deps /app/node_modules /app/node_modules
COPY --from=rsbuilder /app/dist /app/packages/barcode/dist

COPY . .

ARG PUBLIC_PATH
RUN bun run build
RUN [ -f "/app/build/server/index.js" ] && exit 0 || exit 1 

# Run the server

FROM oven/bun:${BUN_VERSION} AS prod

WORKDIR /app

COPY --from=deps /app/node_modules /app/node_modules 

# remix build
COPY --from=remix /app/build /app/build
COPY --from=remix /app/public /app/public

COPY . .

ARG NODE_ENV=production
ENV NODE_ENV=$NODE_ENV
EXPOSE 3000
CMD ["bun", "run", "start"]
