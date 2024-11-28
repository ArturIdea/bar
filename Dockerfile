ARG NODE_VERSION=20

FROM node:${NODE_VERSION}-slim AS builder

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

WORKDIR /app

RUN corepack enable

COPY . /app/

RUN yarn install --immutable

RUN yarn build

EXPOSE 3000

ENV PORT 3000

CMD ["corepack", "yarn", "run","start"]
