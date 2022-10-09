import { builder } from "../builder";
import { db } from "../db";

builder.prismaObject("Payload", {
  fields: (t) => ({
    id: t.exposeID("id"),
    name: t.exposeString("name"),
    launch: t.relation("launchRel"),
  }),
});

builder.queryField("payloads", (t) =>
  t.prismaField({
    type: ["Payload"],
    args: {
      offset: t.arg.int(),
      limit: t.arg.int(),
    },
    resolve: async (query, root, args) => {
      return db.prisma.payload.findMany({ ...query, skip: args.offset as number, take: args.limit as number });
    },
  })
);

builder.queryField("payload", (t) =>
  t.prismaField({
    type: "Payload",
    nullable: true,
    args: {
      id: t.arg.id({ required: true}),
    },
    resolve: async (query, root, args) => {
      return db.prisma.payload.findUnique({where: { id: args.id as string }});
    },
  })
);
