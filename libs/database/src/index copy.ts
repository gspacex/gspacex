import { Prisma, PrismaClient } from "@prisma/client";
import { Prisma as PrismaEdge, PrismaClient as PrismaEdgeClient } from "@prisma/client/edge";
import { settings } from "@gspacex/lib-settings";

export type PrismaClientType = PrismaClient<
  Prisma.PrismaClientOptions,
  never,
  Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined
>;

export let prisma: PrismaClient<
  Prisma.PrismaClientOptions,
  never,
  Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined
>;

function createPrisma() {
  if (settings.SERVERFUL) {
    return new PrismaClient({
      datasources: {
        db: {
          url: settings.DATABASE_URL,
        },
      },
    });
  } else {
    return new PrismaEdgeClient({
      datasources: {
        db: {
          url: settings.DATABASE_URL,
        },
      },
    });
  }  
}

function getDmmf() {
  if (settings.SERVERFUL) {
    return Prisma.dmmf
  } else {
    return PrismaEdge.dmmf
  }
}
export function getPrisma() {
  if(!prisma) {
    prisma = createPrisma();
  }
  return prisma;
}

class Database {
  private _prisma: PrismaClientType | null;
  constructor() {
    this._prisma = null;
  }
  public get prisma() {
    //return this._prisma;
    return getPrisma();
  }
  public get dmmf() {
    return getDmmf();
  }
}

/*class EdgeDatabase extends Database {
  createPrisma() {
    import("@prisma/client/edge").then(({ PrismaClient}) =>{
      return new PrismaClient({
        datasources: {
          db: {
            url: settings.DATABASE_URL,
          },
        },
      });  
    })
  }
}*/

//let db:Database;
export const db = new Database();

