# build environment
FROM node:latest as build
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY package.json ./
COPY yarn.lock ./
RUN npm install yarn
RUN yarn
COPY . ./
RUN yarn run build
RUN yarn add serve
EXPOSE 1777
CMD ["serve", "-s", "build", "-l", "1777"]
