ARG NODE_VERSION=20

FROM node:${NODE_VERSION}-slim AS builder

ARG NEXT_PUBLIC_API_URL
ARG NEXT_PUBLIC_REDIRECT_URI
ARG NEXT_PUBLIC_KEYCLOAK_URL
ARG NEXT_PUBLIC_USER_TYPE

ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_REDIRECT_URI=$NEXT_PUBLIC_REDIRECT_URI
ENV NEXT_PUBLIC_KEYCLOAK_URL=$NEXT_PUBLIC_KEYCLOAK_URL
ENV NEXT_PUBLIC_USER_TYPE=$NEXT_PUBLIC_USER_TYPE

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

WORKDIR /app

# Enable Corepack (Yarn is included from Node 16.10+)
RUN corepack enable

# Copy only what's needed for install first
COPY package.json  ./
COPY .yarn ./.yarn
COPY .yarnrc.yml ./
COPY yarn.lock ./

# Install dependencies using Yarn Berry
RUN yarn install --immutable

# Now copy the rest of the app source
COPY . .

# Build the app
RUN yarn build

EXPOSE 3000
ENV PORT=3000

# Run the app
CMD ["corepack", "yarn", "run", "start"]
