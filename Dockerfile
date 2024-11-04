FROM oven/bun:1.1.15-alpine

WORKDIR /app

COPY package.json .

RUN bun i

COPY . .

RUN bun build:prod

EXPOSE 5001

CMD ["bun","start"]
