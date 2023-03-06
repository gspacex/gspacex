import { builder } from "../builder";
import { db } from "../db";

builder.prismaObject("Company", {
  fields: (t) => ({
    id: t.exposeID("id"),
    name: t.exposeString("name"),
    founder: t.exposeString("founder"),
    founded: t.exposeInt("founded"),
    employees: t.exposeInt("employees"),
    vehicles: t.exposeInt("vehicles"),
    launch_sites: t.exposeInt("launch_sites"),
    test_sites: t.exposeInt("test_sites"),
    ceo: t.exposeString("ceo"),
    cto: t.exposeString("cto"),
    coo: t.exposeString("coo"),
    cto_propulsion: t.exposeString("cto_propulsion"),
    valuation: t.expose("valuation", { type: "BigInt" }),
    headquarters: t.expose("headquarters", { type: "CompanyHeadquarters" }),
    links: t.expose("links", { type: "CompanyLinks" }),
    summary: t.exposeString("summary"),
  }),
});

builder.objectType("CompanyHeadquarters", {
  fields: (t) => ({
    address: t.exposeString("address"),
    city: t.exposeString("city"),
    state: t.exposeString("state"),
  }),
});

builder.objectType("CompanyLinks", {
  fields: (t) => ({
    elon_twitter: t.exposeString("elon_twitter"),
    flickr: t.exposeString("flickr"),
    twitter: t.exposeString("twitter"),
    website: t.exposeString("website"),
  }),
});

builder.queryField("companies", (t) =>
  t.prismaField({
    type: ["Company"],
    args: {
      offset: t.arg.int(),
      limit: t.arg.int(),
    },
    resolve: async (query, root, args) => {
      return db.prisma.company.findMany({
        ...query,
        skip: args.offset as number,
        take: args.limit as number,
      });
    },
  })
);

builder.queryField('company', (t) =>
  t.prismaField({
    type: 'Company',
    nullable: true,
    args: {
      id: t.arg.id({ required: true }),
    },
    resolve: async (query, root, args) => {
      return db.prisma.company.findUnique({
        ...query,
        where: { id: args.id as string },
      });
    },
  })
);
