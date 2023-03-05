export interface Settings {
  DATABASE_URL: string;
  SERVERFUL: string | undefined;
  // Example binding to KV. Learn more at https://developers.cloudflare.com/workers/runtime-apis/kv/
  // MY_KV_NAMESPACE: KVNamespace;
  //
  // Example binding to Durable Object. Learn more at https://developers.cloudflare.com/workers/runtime-apis/durable-objects/
  // MY_DURABLE_OBJECT: DurableObjectNamespace;
  //
  // Example binding to R2. Learn more at https://developers.cloudflare.com/workers/runtime-apis/r2/
  // MY_BUCKET: R2Bucket;
}

declare global {
  namespace NodeJS {
    interface ProcessEnv extends Settings { }
  }
}
//export let settings: Settings | null = null;

export let settings: Settings = {
  DATABASE_URL: "",
  SERVERFUL: undefined,
};

export function configure(env: Settings) {
  settings = {
    DATABASE_URL: env.DATABASE_URL,
    SERVERFUL: env.SERVERFUL,
  };
}
