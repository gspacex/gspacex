import * as dotenv from 'dotenv'
//dotenv.config()
dotenv.config({ path: '../../local.env' })

import { createServer } from 'http'
import { createYoga } from 'graphql-yoga'

import { configure } from "@gspacex/lib-settings";
configure(process.env)

import { schema } from '@gspacex/lib-graphql'

const yoga = createYoga({
  schema,
  graphqlEndpoint: '/',
});
const server = createServer(yoga)

server.listen(8787, '0.0.0.0')