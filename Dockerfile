# build environment
FROM node:20-slim as build
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY package.json ./
COPY yarn.lock ./
RUN yarn --prod
COPY . ./
RUN yarn run build

FROM node:20-slim as run
WORKDIR /app
ENV NODE_ENV production
ENV PATH /app/node_modules/.bin:$PATH
COPY --from=build /app/build /app/build
RUN yarn add serve
EXPOSE 1777
CMD ["serve", "-s", "build", "-l", "1777"]
