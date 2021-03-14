FROM node:14

WORKDIR /usr/src/pern-template

COPY package.json ./
COPY yarn.lock ./

COPY packages/server packages/server
COPY packages/shared packages/shared

RUN yarn install --production

RUN yarn build

ENV NODE_ENV production

EXPOSE 8080
CMD [ "node", "packages/server/dist/index.js" ]