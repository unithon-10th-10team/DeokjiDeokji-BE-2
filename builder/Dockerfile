FROM node:18-alpine AS builder

COPY . /build
WORKDIR /build

RUN npm install

RUN npx prisma generate
RUN npm run build

FROM node:18-alpine

ENV NODE=ENV=production
ENV JWT_SECRET=RoqUcfvBYnu90fx8Q2MeRYuw4AcdOxXQtc2lsdmVybmluZS
COPY --from=builder /build .
COPY ./builder/entrypoint.sh .

ENTRYPOINT [ "./entrypoint.sh" ]

