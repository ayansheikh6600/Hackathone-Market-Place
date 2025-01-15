import { type SchemaTypeDefinition } from 'sanity'
import product from './product'
import user from './user'
import category from './category'
import order from './order'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [product, user, category, order],
}
