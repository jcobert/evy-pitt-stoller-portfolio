'use client'

/**
 * This configuration is used to for the Sanity Studio that’s mounted on the `/app/peach/[[...tool]]/page.tsx` route
 */
// Go to https://www.sanity.io/docs/api-versioning to learn how API versioning works
import { apiVersion, dataset, projectId } from './src/sanity/env'
import { schema } from './src/sanity/schema-types'
import { structure } from './src/sanity/structure'
import { visionTool } from '@sanity/vision'
import { defineConfig } from 'sanity'
import { youtubeInput } from 'sanity-plugin-youtube-input'
import { structureTool } from 'sanity/structure'

import { slugOnPublish } from '@/sanity/actions/slug-on-publish'
import StudioLogo from '@/sanity/components/studio-logo'
import StudioNavbar from '@/sanity/components/studio-navbar'
import { DocumentType } from '@/sanity/types/general'

export default defineConfig({
  basePath: '/peach',
  projectId,
  dataset,
  // Add and edit the content schema in the './sanity/schemaTypes' folder
  schema,
  studio: { components: { navbar: StudioNavbar } },
  icon: StudioLogo,
  plugins: [
    structureTool({ structure }),
    visionTool({ defaultApiVersion: apiVersion }),
    youtubeInput({
      apiKey: process.env.NEXT_PUBLIC_SANITY_STUDIO_YOUTUBE_DATA_API_KEY || '',
    }),
  ],
  document: {
    actions: (prev, context) => {
      switch (context.schemaType as DocumentType) {
        // Use for single/config types when added
        // case '':
        //   return prev?.filter(
        //     (action) =>
        //       !(
        //         [
        //           'delete',
        //           'unpublish',
        //           'duplicate',
        //         ] as DocumentActionComponent['action'][]
        //       )?.includes(action?.action),
        //   )
        case 'project':
          return prev?.map((action) =>
            action?.action === 'publish' ? slugOnPublish(action) : action,
          )
        default:
          return prev
      }
    },
  },
})
