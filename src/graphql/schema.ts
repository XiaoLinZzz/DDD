import { makeSchema } from '@nexus/schema'
import * as path from 'path'
import * as types from './types'

export const schema = makeSchema({
  types,
  outputs: {
    typegen: path.join(__dirname, 'generated/nexus-typegen.ts'),
    schema: path.join(__dirname, 'generated/schema.graphql'),
  },
})
