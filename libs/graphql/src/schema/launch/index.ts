import { builder } from "../../builder";
import { prisma } from "../../db";

import './core'
import './fairing'
import './link'

builder.prismaObject("Launch", {
  fields: (t) => ({
    id: t.exposeID("id"),
    name: t.exposeString("name"),
    //date_utc: t.expose("date_utc", { type: 'DateTime' }),
    date_utc: t.field({
      type: "DateTime",
      resolve: (root, args, ctx, info) => {
        return new Date(root.date_utc);
      },
    }),
    details: t.exposeString("details", { nullable: true }),
    upcoming: t.exposeBoolean("upcoming"),
    rocket: t.relation("rocketRel"),
    cores: t.expose("cores", { type: ["LaunchCore"] }),
    fairings: t.expose("fairings", { type: "LaunchFairings", nullable: true }),
    payloads: t.relation("payloads"),
    launchpad: t.relation("launchpadRel"),
    links: t.expose("links", { type: "LaunchLinks" }),
    capsules: t.relation("capsulesRel"),
  }),
});

builder.queryField("launches", (t) =>
  t.prismaField({
    type: ["Launch"],
    args: {
      offset: t.arg.int(),
      limit: t.arg.int(),
    },
    resolve: async (query, root, args) => {
      return prisma.launch.findMany({ ...query, skip: args.offset as number, take: args.limit as number, orderBy: {date_utc: 'asc'} });
    },
  })
);

builder.queryField("launchesUpcoming", (t) =>
  t.prismaField({
    type: ["Launch"],
    args: {
      offset: t.arg.int(),
      limit: t.arg.int(),
    },
    resolve: async (query, root, args) => {
      return prisma.launch.findMany({ ...query, skip: args.offset as number, take: args.limit as number, where: { upcoming: true}, orderBy: {date_utc: 'asc'} });
    },
  })
);

builder.queryField("launchesPast", (t) =>
  t.prismaField({
    type: ["Launch"],
    args: {
      offset: t.arg.int(),
      limit: t.arg.int(),
    },
    resolve: async (query, root, args) => {
      return prisma.launch.findMany({ ...query, skip: args.offset as number, take: args.limit as number, where: { upcoming: false}, orderBy: {date_utc: 'desc'} });
    },
  })
);

builder.queryField("launch", (t) =>
  t.prismaField({
    type: "Launch",
    nullable: true,
    args: {
      id: t.arg.id({ required: true}),
    },
    resolve: async (query, root, args) => {
      return prisma.launch.findUnique({where: { id: args.id as string }});
    },
  })
);
