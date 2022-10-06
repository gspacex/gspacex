import { builder } from "../builder";
import { prisma } from "../db";
import { Launch } from "@prisma/client";

builder.prismaObject("Capsule", {
  fields: (t) => ({
    id: t.exposeID("id"),
    type: t.exposeString("type"),
    serial: t.exposeString("serial"),
    status: t.exposeString("status"),
    last_update: t.exposeString("last_update", { nullable: true}),
    reuse_count: t.exposeInt("reuse_count"),
    land_landings: t.exposeInt("land_landings"),
    water_landings: t.exposeInt("water_landings"),
    launches: t.relation("launchesRel")
  }),
});

builder.queryField("capsules", (t) =>
  t.prismaField({
    type: ["Capsule"],
    args: {
      offset: t.arg.int(),
      limit: t.arg.int(),
    },
    resolve: async (query, root, args) => {
      return prisma.capsule.findMany({ ...query, skip: args.offset as number, take: args.limit as number });
    },
  })
);

builder.queryField("capsule", (t) =>
  t.prismaField({
    type: "Capsule",
    nullable: true,
    args: {
      id: t.arg.id({ required: true}),
    },
    resolve: async (query, root, args) => {
      return prisma.capsule.findUnique({where: { id: args.id as string }});
    },
  })
);
