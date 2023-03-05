import 'json-bigint-patch';
import { BigIntResolver } from "graphql-scalars";
import { builder } from '../builder'

builder.addScalarType('BigInt', BigIntResolver, {});