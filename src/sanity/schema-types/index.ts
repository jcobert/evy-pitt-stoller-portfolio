import { authorType } from './author-type'
import { blockContentType } from './block-content-type'
import { categoryType } from './category-type'
import { postType } from './post-type'
import { type SchemaTypeDefinition } from 'sanity'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [blockContentType, categoryType, postType, authorType],
}
