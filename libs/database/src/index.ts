import { settings } from "@gspacex/lib-settings";
import { Database } from './base'

import { ServerfulDb } from "./serverful";
import { ServerlessDb } from "./serverless";

export let db:Database;

if (settings.SERVERFUL) {
  db = new ServerfulDb();
} else {
  db = new ServerlessDb();
}
