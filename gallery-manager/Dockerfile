FROM registry.jianke.com/library/node:10

COPY package.json /var/www/package.json
COPY yarn.lock /var/www/yarn.lock
COPY .npmrc /var/www/.npmrc

COPY public/ /var/www/public/
COPY dist/ /var/www/dist/
COPY lib/ /var/www/lib/

COPY server.js /var/www/server.js

WORKDIR /var/www
ENV NODE_ENV production
RUN yarn --production

EXPOSE 8080

ENTRYPOINT ["npm", "start"]
