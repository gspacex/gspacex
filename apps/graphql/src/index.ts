import { createServer } from '@graphql-yoga/node';

import { schema } from '@gspacex/lib-graphql'

const server = createServer({
  schema,
});

server.start();