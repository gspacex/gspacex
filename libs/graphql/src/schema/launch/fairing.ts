import { builder } from "../../builder";
import { prisma } from "../../db";

builder.objectType("LaunchFairings", {
  fields: (t) => ({
    reused: t.exposeBoolean("reused", { nullable: true }),
    recovery_attempt: t.exposeBoolean("recovery_attempt", { nullable: true }),
    recovered: t.exposeBoolean("recovered", { nullable: true }),
  }),
});
