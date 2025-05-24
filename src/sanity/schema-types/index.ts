import { authorType } from './author-type'
import { blockContentType } from './block-content-type'
import { categoryType } from './category-type'
import { imageAltText, videoAltText } from './general/alt-text-type'
import { videoType } from './general/video-type'
import { postType } from './post-type'
import { projectType } from './project-type'
import { type SchemaTypeDefinition } from 'sanity'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    blockContentType,
    imageAltText,
    videoAltText,
    videoType,
    categoryType,
    postType,
    authorType,
    projectType,
  ],
}
