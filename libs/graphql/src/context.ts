import { YogaInitialContext } from "graphql-yoga";
import { initContextCache } from "@pothos/core";
import { createContextCache } from '@pothos/core';

export interface Context extends YogaInitialContext {
  nothing: boolean;
}

//export const usersCounts = createContextCache(() => ({ nothing: true }))
//createContextCache(() => ({ nothing: true }));
/*export function createContext(req, res): Context {
  return {
    // Adding this will prevent any issues if you server implementation
    // copies or extends the context object before passing it to your resolvers
    ...initContextCache(),
    nothing: true,
  };
}*/
