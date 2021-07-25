FROM node:lts-alpine
LABEL maintainer="12muhammadzulfa@gmail.com"

# Setup Environtemnt
ENV NODE_ENV production
ENV PORT 3001

EXPOSE 3001

# Preparing Workspace
RUN mkdir -p /opt/app
RUN apk add yarn

WORKDIR /opt/app

# Preparing Dependencies
COPY package.json /opt/app
COPY package-lock.json /opt/app

# Install Dependencies
RUN npm ci --no-optional
RUN npm install eslint babel-eslint -g

# Preparing App Source
COPY . /opt/app

# Build App
RUN npx next telemetry disable
RUN npm run build

CMD ["node_modules/.bin/next", "start"]
