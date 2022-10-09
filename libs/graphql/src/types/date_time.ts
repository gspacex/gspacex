import { DateTimeResolver } from "graphql-scalars";
import { builder } from '../builder'

builder.addScalarType('DateTime', DateTimeResolver, {});

/*builder.scalarType("DateTime", {
  //serialize: (n) => new Date(n),
  serialize: (n) => moment.utc(n),
  parseValue: (n) => {
      return new Date(n)
    }
});*/
