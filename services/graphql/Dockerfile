FROM node:16.16.0-slim as base

ENV APP_HOME /app


#RUN npm -g i pnpm@7.13.3 && \
#    pnpm install --frozen-lockfile --ignore-scripts

RUN npm -g i pnpm@7.13.3

RUN mkdir $APP_HOME && chown -R node $APP_HOME
USER node
WORKDIR $APP_HOME

EXPOSE 8787

RUN pnpm install

FROM base AS development

ENTRYPOINT ["bash", "./docker-entrypoint.sh", "$0 $@"]
CMD pnpm run dev

FROM base AS production

ENTRYPOINT ["bash", "./docker-entrypoint.sh", "$0 $@"]
CMD pnpm run start