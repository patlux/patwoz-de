ARG BUN_VERSION=1.0.14

FROM rust:latest as rsbuilder

RUN curl https://rustwasm.github.io/wasm-pack/installer/init.sh -sSf | sh
RUN rustup target add wasm32-unknown-emscripten

WORKDIR /app
COPY . .

WORKDIR /app/packages/barcode
RUN make build

# Install packages

FROM oven/bun:${BUN_VERSION} as deps

WORKDIR /app

COPY --from=rsbuilder /app/packages/barcode/dist /app/packages/barcode/dist
COPY package.json bun.lockb ./
RUN echo "[install]\noptional = false\ndev = true\npeer = false" >> bunfig.toml
RUN bun install --ignore-scripts

# Build remix application

FROM node:18-bullseye-slim as remix

WORKDIR /app

COPY --from=deps /usr/local/bin/bun /bin/bun
COPY --from=deps /app/node_modules /app/node_modules

COPY . .

ARG PUBLIC_PATH
RUN bun run build
RUN [ -f "/app/build/index.js" ] && exit 0 || exit 1 

# Run the server

FROM oven/bun:${BUN_VERSION} as prod

WORKDIR /app

COPY --from=deps /app/node_modules /app/node_modules 

# remix build
COPY --from=remix /app/build /app/build
COPY --from=remix /app/public /app/public

COPY . .

ARG NODE_ENV=production
ENV NODE_ENV $NODE_ENV
EXPOSE 3000
CMD ["bun", "run", "/app/server.ts"]
