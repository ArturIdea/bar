ARG NODE_VERSION=20

FROM node:${NODE_VERSION}-slim AS builder

ARG NEXT_PUBLIC_API_URL

ENV NEXT_PUBLIC_API_URL=https://baraka-app-api-staging.uz-pay-dev.ox.one
ENV NEXT_PUBLIC_REDIRECT_URI=https://baraka-app-webapp-staging.uz-pay-dev.ox.one
ENV NEXT_PUBLIC_KEYCLOAK_URL=https://kc-staging.uz-pay-dev.ox.one

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

WORKDIR /app

RUN corepack enable

COPY . /app/

RUN env

RUN yarn install --immutable

RUN yarn build

EXPOSE 3000

ENV PORT 3000

CMD ["corepack", "yarn", "run","start"]
