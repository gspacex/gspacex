import { Prisma, PrismaClient } from "@prisma/client";
import { PrismaClient as PrismaEdgeClient } from "@prisma/client/edge";
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

if (settings.SERVERLESS) {
  prisma = new PrismaEdgeClient({
    datasources: {
      db: {
        url: settings.DATABASE_URL,
      },
    },
  });
} else {
  prisma = new PrismaClient({
    datasources: {
      db: {
        url: settings.DATABASE_URL,
      },
    },
  });
}
//export const prisma = new PrismaClient({});
/*prisma = new PrismaEdgeClient({
  datasources: {
    db: {
      url: settings.DATABASE_URL
    }
  }
})*/
