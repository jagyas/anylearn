
FROM node:alpine AS BUILD_IMAGE

# couchbase sdk requirements
RUN apk update && apk add yarn curl bash python3 g++ make && rm -rf /var/cache/apk/*

# install node-prune (https://github.com/tj/node-prune)
RUN curl -sfL https://gobinaries.com/tj/node-prune | bash -s -- -b /usr/local/bin

WORKDIR /app

COPY package.json yarn.lock ./

# install dependencies
RUN yarn --frozen-lockfile

COPY . .

# lint & test
RUN yarn lint & yarn test

# build application
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

FROM gcr.io/distroless/nodejs:18

ENV NODE_ENV production

WORKDIR /app

# copy from build image
COPY --from=BUILD_IMAGE /app/dist ./dist
COPY --from=BUILD_IMAGE /app/node_modules ./node_modules

ENV PORT 3001
EXPOSE 3001

CMD [ "./dist/main.js" ]
