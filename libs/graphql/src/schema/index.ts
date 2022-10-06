import './core'
import './rocket'
import './launch'
import './payload'
import './launchpad'
import './dragon'
import './capsule'

import { builder } from '../builder'

builder.queryType({});

export const schema = builder.toSchema()