import * as dotenv from 'dotenv'
dotenv.config()

import { createServer } from 'http'
import { createYoga } from 'graphql-yoga'

import { configure } from "@gspacex/lib-settings";
configure(process.env)

import { schema } from '@gspacex/lib-graphql'

const yoga = createYoga({
  schema,
});
const server = createServer(yoga)

server.listen(4000, '127.0.0.1')