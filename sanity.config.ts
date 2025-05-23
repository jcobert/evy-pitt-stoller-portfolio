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
import { structureTool } from 'sanity/structure'

import StudioLogo from '@/sanity/components/studio-logo'
import StudioNavbar from '@/sanity/components/studio-navbar'

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
    // Vision is for querying with GROQ from inside the Studio
    // https://www.sanity.io/docs/the-vision-plugin
    visionTool({ defaultApiVersion: apiVersion }),
  ],
})
