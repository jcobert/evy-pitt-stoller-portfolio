import { imageAltText, videoAltText } from './general/alt-text-type'
import { blockContentType } from './general/block-content-type'
import { pageHeadingType } from './general/page-heading-type'
import { seoType } from './general/seo-type'
import { videoGroupType } from './general/video-group-type'
import { videoType } from './general/video-type'
import { aboutPageType } from './pages/about-page-type'
import { contactPageType } from './pages/contact-page-type'
import { homePageType } from './pages/home-page-type'
import { portfolioPageType } from './pages/portfolio-page-type'
import { productionPageType } from './pages/production-page-type'
import { writingPageType } from './pages/writing-page-type'
import { contactInfoType } from './profile/contact-info-type'
import { profileType } from './profile/profile-type'
import { socialLinksType } from './profile/social-links-type'
import { projectCollectionType } from './project/project-collection-type'
import { projectRoleType } from './project/project-role-type'
import { projectSeriesType } from './project/project-series-type'
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
  seoType,
  // Profile
  contactInfoType,
  socialLinksType,
  profileType,
  // Pages
  aboutPageType,
  homePageType,
  contactPageType,
  portfolioPageType,
  productionPageType,
  writingPageType,
  // Portfolio
  projectType,
  projectSeriesType,
  projectRoleType,
  projectCollectionType,
]
