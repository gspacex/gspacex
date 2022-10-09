export interface Env {
  DATABASE_URL: string;
  // Example binding to KV. Learn more at https://developers.cloudflare.com/workers/runtime-apis/kv/
  // MY_KV_NAMESPACE: KVNamespace;
  //
  // Example binding to Durable Object. Learn more at https://developers.cloudflare.com/workers/runtime-apis/durable-objects/
  // MY_DURABLE_OBJECT: DurableObjectNamespace;
  //
  // Example binding to R2. Learn more at https://developers.cloudflare.com/workers/runtime-apis/r2/
  // MY_BUCKET: R2Bucket;
}

import { createYoga } from "graphql-yoga";
//import { initContextCache } from "@pothos/core";
import { Settings, configure } from "@gspacex/lib-settings";
//import { schema } from "@gspacex/lib-graphql";


export default {
  async fetch(request: Request, env: Settings, ctx: ExecutionContext) {
    configure(env);
    const { schema } = await import("@gspacex/lib-graphql");
    const yoga = createYoga({
      schema,
      graphqlEndpoint: '/',
      /*context(ctx) {
        return {
          //...ctx,
          ...initContextCache(),
          nothing: true,
        };
      },*/
    });    
    return yoga.handleRequest(request, { env, ctx });
  },
};
