FROM node:alpine AS BUILD_IMAGE

# Disable telemetry
ENV NEXT_TELEMETRY_DISABLED 1

# couchbase sdk requirements
RUN apk update && apk add yarn curl bash python3 g++ make && rm -rf /var/cache/apk/*

# install node-prune (https://github.com/tj/node-prune)
RUN curl -sfL https://gobinaries.com/tj/node-prune | bash -s -- -b /usr/local/bin

# Create app directory
RUN mkdir -p /app

WORKDIR /app

# Installing dependencies
COPY package.json yarn.lock /app/

RUN yarn --frozen-lockfile

# Copying source files
COPY . .

# lint & test
#RUN yarn lint & yarn test

# Building app
RUN yarn build

# remove development dependencies
RUN npm prune --omit=dev

# run node prune
RUN /usr/local/bin/node-prune

# remove unused dependencies
RUN rm -rf node_modules/rxjs/src/
RUN rm -rf node_modules/rxjs/bundles/
RUN rm -rf node_modules/rxjs/_esm5/
RUN rm -rf node_modules/rxjs/_esm2015/
RUN rm -rf node_modules/swagger-ui-dist/*.map
RUN rm -rf node_modules/couchbase/src/

# Running the app
FROM gcr.io/distroless/nodejs:18
WORKDIR /app

# Mark as prod, disable telemetry, set port
ENV NODE_ENV production
ENV PORT 3000
ENV NEXT_TELEMETRY_DISABLED 1

# Copy from build
COPY --from=BUILD_IMAGE /app/.next/standalone ./
COPY --from=BUILD_IMAGE /app/public ./public
COPY --from=BUILD_IMAGE /app/.next/static ./.next/static

# Run app command
CMD [ "server.js" ]