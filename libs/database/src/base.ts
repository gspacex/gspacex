import { Prisma, PrismaClient } from "@prisma/client";

export type PrismaClientType = PrismaClient<
  Prisma.PrismaClientOptions,
  never
>;

export abstract class Database {
  public _prisma: PrismaClientType | null;
  constructor() {
    this._prisma = null;
  }
  public abstract get prisma(): PrismaClient;
  public abstract get dmmf(): typeof Prisma.dmmf;
}
