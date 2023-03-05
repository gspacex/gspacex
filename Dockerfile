FROM node:lts-buster-slim as base

ENV APP_HOME /app

#RUN apt update && apt install -y ca-certificates
RUN apt update && apt install -y openssl

#RUN mkdir -p $APP_HOME
WORKDIR $APP_HOME
EXPOSE 8787

FROM base AS development

ENTRYPOINT bash ./docker-entrypoint.sh $0 $@
CMD ["yarn", "dev"]

FROM base AS production

ENTRYPOINT bash ./docker-entrypoint.sh $0 $@
CMD ["yarn", "start"]