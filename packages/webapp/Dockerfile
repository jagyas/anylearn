FROM node:12

ENV PORT 3000

# Create app directory
RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

# Installing dependencies
COPY ./packages/webapp/package.json /usr/src/app/
COPY ./packages/webapp/package-lock.json /usr/src/app/


RUN npm install

# Copying source files
COPY ./packages/webapp/ /usr/src/app

# Building app
RUN npm run build

EXPOSE 3000
EXPOSE 9229

# Running the app
ENTRYPOINT ["npm", "run"]
