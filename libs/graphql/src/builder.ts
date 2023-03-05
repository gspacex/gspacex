import SchemaBuilder from "@pothos/core";
//import { prisma } from "@gspacex/lib-database"
import { db } from "@gspacex/lib-database"
//import { Prisma } from '@prisma/client';
//import { Prisma } from '@prisma/client/edge';
//console.log(Prisma.dmmf)
import { Context } from './context'
import {
  //PrismaClient,
  CompanyHeadquarters,
  CompanyLinks,
  RocketEngines,
  RocketEnginesThrustSeaLevel,
  RocketEnginesThrustVacuum,
  RocketDiameter,
  LaunchCore,
  LaunchFairings,
  LaunchLinks,
  LaunchLinksFlickr,
  LaunchLinksPatch,
  LaunchpadImages,
  DragonDiameter,
  DragonHeatShield,
  DragonHeightWTrunk,
  DragonLaunchPayloadMass,
  DragonLaunchPayloadVol,
  DragonPressurizedCapsule,
  DragonPressurizedCapsulePayloadVolume,
  DragonReturnPayloadMass,
  DragonReturnPayloadVol,
  DragonThrusters,
  DragonThrustersThrust,
  DragonTrunk,
  DragonTrunkCargo,
  DragonTrunkTrunkVolume,
 } from "@prisma/client";
import PrismaPlugin from "@pothos/plugin-prisma";

import type PrismaTypes from "@pothos/plugin-prisma/generated";

export const builder = new SchemaBuilder<{
  Context: Context;
  PrismaTypes: PrismaTypes;
  Scalars: {
    BigInt: {
      Input: BigInt;
      Output: BigInt;
    };
    DateTime: {
      Input: Date;
      Output: Date;
    };
  };
  Objects: {
    CompanyHeadquarters: CompanyHeadquarters,
    CompanyLinks: CompanyLinks,
    RocketEngines: RocketEngines,
    RocketEnginesThrustSeaLevel: RocketEnginesThrustSeaLevel,
    RocketEnginesThrustVacuum: RocketEnginesThrustVacuum,
    RocketDiameter: RocketDiameter;
    LaunchCore: LaunchCore;
    LaunchFairings: LaunchFairings;
    LaunchLinks: LaunchLinks;
    LaunchLinksFlickr: LaunchLinksFlickr;
    LaunchLinksPatch: LaunchLinksPatch;
    LaunchpadImages: LaunchpadImages;
  };
}>({
  plugins: [PrismaPlugin],
  prisma: {
    //client: prisma,
    //
    client: (ctx) => db.prisma,
    //client: getPrisma(),
    //client: getPrisma,
    // Because the prisma client is loaded dynamically, we need to explicitly provide information about the prisma schema
    dmmf: db.dmmf,
    // defaults to false, uses /// comments from prisma schema as descriptions
    // for object types, relations and exposed fields.
    // descriptions can be omitted by setting description to false
    //exposeDescriptions: boolean | { models: boolean, fields: boolean },
    // use where clause from prismaRelatedConnection for totalCount (will true by default in next major version)
    filterConnectionTotalCount: true,
  },
});
