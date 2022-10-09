import { Prisma, PrismaClient } from "@prisma/client";

import { settings } from "@gspacex/lib-settings";
import { Database } from './base'

export class ServerfulDb extends Database {
  public get prisma(): PrismaClient {
    if (this._prisma) {
      return this._prisma;
    }
    this._prisma = new PrismaClient({
      datasources: {
        db: {
          url: settings.DATABASE_URL,
        },
      },
    });
    return this._prisma
  }
  public get dmmf(): typeof Prisma.dmmf {
    return Prisma.dmmf
  }
}