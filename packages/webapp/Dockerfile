FROM node:12

ENV PORT 3001

# Create app directory
RUN mkdir -p /usr/src/app
RUN mkdir -p /usr/src/app/js-sdk
RUN mkdir -p /usr/src/app/node_modules/js-sdk

WORKDIR /usr/src/app/js-sdk

# Copying source files
COPY ../js-sdk/ /usr/src/app/js-sdk

# Building app
RUN npm install
RUN npm run build

COPY ./build /usr/src/app/node_modules/js-sdk

WORKDIR /usr/src/app

# Installing dependencies
COPY package.json /usr/src/app/
COPY package-lock.json /usr/src/app/


RUN npm install

# Copying source files
COPY . /usr/src/app

# Building app
RUN npm run build

EXPOSE 3001

# Running the app
ENTRYPOINT ["npm", "run", "start"]
