FROM node:12

ENV PORT 3001

# Create app directory
RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

# Installing dependencies
COPY package.json yarn.lock /usr/src/app/

RUN yarn

# Copying source files
COPY . /usr/src/app

# Building app
RUN npm run build

EXPOSE 3001

# Running the app
ENTRYPOINT ["npm", "run", "start"]
