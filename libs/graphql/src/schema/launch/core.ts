import { builder } from "../../builder";
import { prisma } from "../../db";

builder.objectType("LaunchCore", {
  fields: (t) => ({
    flight: t.exposeInt("flight", { nullable: true }),
    core: t.prismaField({
      type: "Core",
      nullable: true,
      resolve: async (query, root, args, ctx, info) => {
        if (root.core) {
          return prisma.core.findUnique({ where: { id: root.core } });
        }
      },
    }),
  }),
});
