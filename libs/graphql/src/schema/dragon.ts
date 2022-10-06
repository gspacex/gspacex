import { builder } from "../builder";
import { prisma } from "../db";

builder.prismaObject("Dragon", {
  fields: (t) => ({
    id: t.exposeID("id"),
    name: t.exposeString("name"),
    description: t.exposeString("description"),
    images: t.exposeStringList("flickr_images"),
    active: t.exposeBoolean("active"),
  }),
});

builder.queryField("dragons", (t) =>
  t.prismaField({
    type: ["Dragon"],
    args: {
      offset: t.arg.int(),
      limit: t.arg.int(),
    },
    resolve: async (query, root, args) => {
      return prisma.dragon.findMany({ ...query, skip: args.offset as number, take: args.limit as number });
    },
  })
);

builder.queryField("dragon", (t) =>
  t.prismaField({
    type: "Dragon",
    nullable: true,
    args: {
      id: t.arg.id({ required: true}),
    },
    resolve: async (query, root, args) => {
      return prisma.dragon.findUnique({where: { id: args.id as string }});
    },
  })
);
