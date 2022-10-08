import * as dotenv from 'dotenv'
dotenv.config()

import { createServer } from '@graphql-yoga/node';

import { configure } from "@gspacex/lib-settings";
configure(process.env)

import { schema } from '@gspacex/lib-graphql'

const server = createServer({
  schema,
});

server.start();