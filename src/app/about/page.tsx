import { Metadata } from 'next'
import { FC } from 'react'

import { getSanityImageUrl } from '@/utils/media'
import { fullName } from '@/utils/string'

import PortableBlockContent from '@/components/general/portable-block-content'
import Heading from '@/components/layout/heading'
import Main from '@/components/layout/main'
import PageLayout from '@/components/layout/page-layout'

import { PageParams } from '@/types/general'

import { generatePageMeta } from '@/configuration/seo'
import { client } from '@/sanity/lib/client'
import { PROFILE_QUERY } from '@/sanity/lib/queries/profile-query'
import { PROFILE_QUERYResult } from '@/sanity/types/generated/types'

const fetchContent = async () => {
  const profile = await client.fetch<PROFILE_QUERYResult>(PROFILE_QUERY)
  return { profile }
}

export const generateMetadata = async (): Promise<Metadata> => {
  const { profile } = await fetchContent()

  return generatePageMeta({
    title: 'About Me',
    description: 'Learn more about my background, skills, and achievements.',
    url: '/about',
    images: [
      getSanityImageUrl(profile?.photo, {
        ratio: 'square',
        crop: 'top',
      }),
    ],
  })
}

type Props = PageParams

const Page: FC<Props> = async () => {
  const { profile } = await fetchContent()
  const { bio, photo, firstName, lastName } = profile || {}

  const image = getSanityImageUrl(photo, { ratio: 'original', width: 400 })

  return (
    <Main className='bg-pale-yellow'>
      <PageLayout className='pb-12'>
        <Heading text='About Me' className='max-lg:mx-auto' />

        <div className='flex max-lg:flex-col-reverse max-lg:items-center gap-8 md:gap-y-10 gap-y-6'>
          <div className='max-w-prose text-pretty'>
            <PortableBlockContent value={bio} />
          </div>

          <div className='w-3/5 sm:w-1/2 h-fit max-w-2xs md:min-w-60 max-lg:aspect-square mx-auto border-3 border-white/90 rounded-md bg-light-purple'>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={image}
              alt={fullName(firstName, lastName)}
              className='size-full rounded-sm object-cover object-top max-lg:aspect-square'
            />
          </div>
        </div>
      </PageLayout>
    </Main>
  )
}

export default Page
