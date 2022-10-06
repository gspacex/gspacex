import SchemaBuilder from "@pothos/core";
import {
  PrismaClient,
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

const prisma = new PrismaClient({});

export const builder = new SchemaBuilder<{
  PrismaTypes: PrismaTypes;
  Scalars: {
    DateTime: {
      Input: Date;
      Output: Date;
    };
  };
  Objects: {
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
    client: prisma,
    // defaults to false, uses /// comments from prisma schema as descriptions
    // for object types, relations and exposed fields.
    // descriptions can be omitted by setting description to false
    //exposeDescriptions: boolean | { models: boolean, fields: boolean },
    // use where clause from prismaRelatedConnection for totalCount (will true by default in next major version)
    filterConnectionTotalCount: true,
  },
});
