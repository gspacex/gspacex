//import * as dotenv from 'dotenv'
//dotenv.config()

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

/*function isNode() {
  if ((typeof process !== 'undefined') &&
  (process.release.name.search(/node|io.js/) !== -1)) {
    return true;
  } else {
    return false;
  }  
}*/
/*function isNode() {
  //return process != undefined
  //return typeof process === 'object';
  return typeof window === 'undefined'
}

if(isNode()) {
  //import * as dotenv from 'dotenv'
  //const dotenv = await import('dotenv')
  //dotenv.config()
  import('dotenv').then(dotenv => { dotenv.config()})
  configure(process.env);
}*/