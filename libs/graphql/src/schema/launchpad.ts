import { builder } from "../builder";
import { db } from "../db";

builder.prismaObject("Launchpad", {
  fields: (t) => ({
    id: t.exposeID("id"),
    name: t.exposeString("name"),
    status: t.exposeString("status"),
    images: t.expose("images", { type: "LaunchpadImages", nullable: true }),
    launches: t.relation("launches"),
  }),
});

builder.queryField("launchpads", (t) =>
  t.prismaField({
    type: ["Launchpad"],
    args: {
      offset: t.arg.int(),
      limit: t.arg.int(),
    },
    resolve: async (query, root, args) => {
      return db.prisma.launchpad.findMany({
        ...query,
        skip: args.offset as number,
        take: args.limit as number,
      });
    },
  })
);

builder.queryField("launchpad", (t) =>
  t.prismaField({
    type: "Launchpad",
    nullable: true,
    args: {
      id: t.arg.id({ required: true }),
    },
    resolve: async (query, root, args) => {
      return db.prisma.launchpad.findUnique({ where: { id: args.id as string } });
    },
  })
);

builder.objectType("LaunchpadImages", {
  fields: (t) => ({
    large: t.exposeStringList("large"),
  }),
});
