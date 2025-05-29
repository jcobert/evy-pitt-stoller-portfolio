import { defineEnableDraftMode } from 'next-sanity/draft-mode'

import { previewToken } from '@/sanity/env'
import { client } from '@/sanity/lib/client'

export const { GET } = defineEnableDraftMode({
  client: client.withConfig({ token: previewToken }),
})
