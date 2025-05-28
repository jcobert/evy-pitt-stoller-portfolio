import { contactInfoType } from './about/contact-info-type'
import { profileType } from './about/profile-type'
import { socialLinksType } from './about/social-links-type'
import { authorType } from './blog/author-type'
import { categoryType } from './blog/category-type'
import { postType } from './blog/post-type'
import { imageAltText, videoAltText } from './general/alt-text-type'
import { blockContentType } from './general/block-content-type'
import { videoGroupType } from './general/video-group-type'
import { videoType } from './general/video-type'
import { projectType } from './project/project-type'
import { type SchemaTypeDefinition } from 'sanity'

export const schemaTypes: SchemaTypeDefinition[] = [
  // General
  blockContentType,
  imageAltText,
  videoAltText,
  videoType,
  videoGroupType,
  // About
  contactInfoType,
  socialLinksType,
  profileType,
  // Blog
  postType,
  authorType,
  categoryType,
  // Projects
  projectType,
]
