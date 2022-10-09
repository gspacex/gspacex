import { builder } from "../builder";
import { db } from "../db";

builder.objectType("RocketEngines", {
  fields: (t) => ({
    number: t.exposeInt("number"),
    engine_loss_max: t.exposeInt("engine_loss_max", { nullable: true}),
    layout: t.exposeString("layout", { nullable: true}),
    propellant_1: t.exposeString("propellant_1"),
    propellant_2: t.exposeString("propellant_2"),
    thrust_sea_level: t.expose("thrust_sea_level", { type: "RocketEnginesThrustSeaLevel"}),
    thrust_vacuum: t.expose("thrust_vacuum", { type: "RocketEnginesThrustVacuum"}),
    thrust_to_weight: t.exposeFloat("thrust_to_weight"),
    type: t.exposeString("type"),
    version: t.exposeString("version"),
  }),
});

builder.objectType("RocketEnginesThrustSeaLevel", {
  fields: (t) => ({
    lbf: t.exposeInt("lbf"),
  }),
});

builder.objectType("RocketEnginesThrustVacuum", {
  fields: (t) => ({
    lbf: t.exposeInt("lbf"),
  }),
});

builder.objectType("RocketDiameter", {
  fields: (t) => ({
    feet: t.exposeFloat("feet"),
  }),
});

builder.prismaObject("Rocket", {
  fields: (t) => ({
    id: t.exposeID("id"),
    name: t.exposeString("name"),
    description: t.exposeString("description"),
    images: t.exposeStringList("flickr_images"),
    active: t.exposeBoolean("active"),
    boosters: t.exposeInt("boosters"),
    diameter: t.expose("diameter", { type: "RocketDiameter" }),
    launches: t.relation("launches"),
    engines: t.expose("engines", { type: "RocketEngines" }),
  }),
});

builder.queryField("rockets", (t) =>
  t.prismaField({
    type: ["Rocket"],
    args: {
      offset: t.arg.int(),
      limit: t.arg.int(),
    },
    resolve: async (query, root, args) => {
      return db.prisma.rocket.findMany({ ...query, skip: args.offset as number, take: args.limit as number });
    },
  })
);

builder.queryField("rocket", (t) =>
  t.prismaField({
    type: "Rocket",
    nullable: true,
    args: {
      id: t.arg.id({ required: true}),
    },
    resolve: async (query, root, args) => {
      return db.prisma.rocket.findUnique({where: { id: args.id as string }});
    },
  })
);
