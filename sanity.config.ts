'use client'

/**
 * This configuration is used to for the Sanity Studio that’s mounted on the `/app/studio/[[...tool]]/page.tsx` route
 */
// Go to https://www.sanity.io/docs/api-versioning to learn how API versioning works
import { apiVersion, dataset, projectId } from './src/sanity/env'
import { schemaTypes } from './src/sanity/schema-types'
import { structure } from './src/sanity/structure'
import { dashboardTool } from '@sanity/dashboard'
import { visionTool } from '@sanity/vision'
import { DocumentActionComponent, defineConfig, isDev } from 'sanity'
import { vercelWidget } from 'sanity-plugin-dashboard-widget-vercel'
import { vimeoField } from 'sanity-plugin-vimeo-field'
import { youtubeInput } from 'sanity-plugin-youtube-input'
import { structureTool } from 'sanity/structure'

import { slugOnPublish } from '@/sanity/actions/slug-on-publish'
import StudioLogo from '@/sanity/components/studio-logo'
import StudioNavbar from '@/sanity/components/studio-navbar'
import { DocumentType } from '@/sanity/types/general'

export const singletonDocuments = new Set<string>([
  'profile',
  'aboutPage',
  'homePage',
  'contactPage',
  'portfolioPage',
  'productionPage',
  'writingPage',
] satisfies DocumentType[])

const singletonActions = new Set<string>([
  'publish',
  'discardChanges',
  'restore',
] satisfies DocumentActionComponent['action'][])

const documentsToSlugify = new Set<string>(['project'] satisfies DocumentType[])

export default defineConfig({
  basePath: '/studio',
  projectId,
  dataset,
  // Add and edit the content schema in the './sanity/schemaTypes' folder
  schema: {
    types: schemaTypes,
    templates: (templates) =>
      templates.filter(({ schemaType }) => !singletonDocuments.has(schemaType)),
  },
  studio: { components: { navbar: StudioNavbar } },
  icon: StudioLogo,
  plugins: [
    structureTool({ structure, title: 'Editor' }),
    dashboardTool({
      widgets: [
        vercelWidget({
          layout: { width: 'full' },
        }),
      ],
    }),
    ...(isDev ? [visionTool({ defaultApiVersion: apiVersion })] : []),
    youtubeInput({
      apiKey: process.env.NEXT_PUBLIC_SANITY_STUDIO_YOUTUBE_DATA_API_KEY || '',
    }),
    vimeoField({
      accessToken: process.env.NEXT_PUBLIC_SANITY_STUDIO_VIMEO_API_KEY,
    }),
  ],
  document: {
    actions: (prev, context) => {
      const schemaType = context.schemaType as DocumentType

      if (singletonDocuments?.has(schemaType)) {
        return prev?.filter(
          ({ action }) => !!action && singletonActions.has(action),
        )
      }

      if (documentsToSlugify.has(schemaType)) {
        return prev?.map((action) =>
          action?.action === 'publish' ? slugOnPublish(action) : action,
        )
      }

      return prev
    },
  },
})
