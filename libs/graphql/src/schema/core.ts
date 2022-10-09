import { builder } from "../builder";
import { db } from "../db";
import { Launch } from "@prisma/client";

builder.prismaObject("Core", {
  fields: (t) => ({
    id: t.exposeID("id"),
    serial: t.exposeString("serial"),
    status: t.exposeString("status"),
    last_update: t.exposeString("last_update", { nullable: true}),
    asds_attempts: t.exposeInt("asds_attempts"),
    asds_landings: t.exposeInt("asds_landings"),
    block: t.exposeInt("asds_landings"),

    reuse_count: t.exposeInt("reuse_count"),
    rtls_attempts: t.exposeInt("rtls_attempts"),
    rtls_landings: t.exposeInt("rtls_landings"),

    //launches: t.exposeIDList("launches"),
    launches: t.prismaField({
      type: ["Launch"],
      resolve: async (_, root) => {
        const launches: Array<Launch> = [];
        for (let id of root.launches) {
          const launch = db.prisma.launch.findUnique({
            where: { id },
          }) as unknown;
          launches.push(launch as Launch);
        }
        return launches;
      },
    }),
  }),
});

builder.queryField("cores", (t) =>
  t.prismaField({
    type: ["Core"],
    args: {
      offset: t.arg.int(),
      limit: t.arg.int(),
    },
    resolve: async (query, root, args) => {
      return db.prisma.core.findMany({ ...query, skip: args.offset as number, take: args.limit as number });
    },
  })
);

builder.queryField("core", (t) =>
  t.prismaField({
    type: "Core",
    nullable: true,
    args: {
      id: t.arg.id({ required: true}),
    },
    resolve: async (query, root, args) => {
      return db.prisma.core.findUnique({where: { id: args.id as string }});
    },
  })
);
