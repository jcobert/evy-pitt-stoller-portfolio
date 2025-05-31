import { authorType } from './blog/author-type'
import { categoryType } from './blog/category-type'
import { postType } from './blog/post-type'
import { imageAltText, videoAltText } from './general/alt-text-type'
import { blockContentType } from './general/block-content-type'
import { pageHeadingType } from './general/page-heading-type'
import { videoGroupType } from './general/video-group-type'
import { videoType } from './general/video-type'
import { aboutPageType } from './pages/about-page-type'
import { contactPageType } from './pages/contact-page-type'
import { homePageType } from './pages/home-page-type'
import { productionPageType } from './pages/production-page-type'
import { writingPageType } from './pages/writing-page-type'
import { contactInfoType } from './profile/contact-info-type'
import { profileType } from './profile/profile-type'
import { socialLinksType } from './profile/social-links-type'
import { projectType } from './project/project-type'
import { type SchemaTypeDefinition } from 'sanity'

export const schemaTypes: SchemaTypeDefinition[] = [
  // General
  blockContentType,
  imageAltText,
  videoAltText,
  videoType,
  videoGroupType,
  pageHeadingType,
  // Profile
  contactInfoType,
  socialLinksType,
  profileType,
  // Pages
  aboutPageType,
  homePageType,
  contactPageType,
  productionPageType,
  writingPageType,
  // Portfolio
  projectType,
  // Blog
  postType,
  authorType,
  categoryType,
]
