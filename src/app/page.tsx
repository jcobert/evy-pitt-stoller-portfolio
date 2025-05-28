import { omit } from 'lodash'
import { Metadata } from 'next'
import { FC } from 'react'

import { getSanityImageUrl } from '@/utils/media'
import { cn } from '@/utils/style'

import CardStack from '@/components/general/card-stack'
import ContactLinks from '@/components/general/contact-links'
import Main from '@/components/layout/main'
import PageLayout from '@/components/layout/page-layout'

import { generatePageMeta } from '@/configuration/seo'
import { client } from '@/sanity/lib/client'
import { PROFILE_QUERY } from '@/sanity/lib/queries/profile-query'
import { PROFILE_QUERYResult } from '@/sanity/types/generated/types'

export const metadata: Metadata = generatePageMeta({
  title: 'Home',
  description: '',
  url: '/',
})

const Page: FC = async () => {
  const profile = await client.fetch<PROFILE_QUERYResult>(PROFILE_QUERY)

  const photo = getSanityImageUrl(profile?.photo, {
    ratio: 'original',
  })

  const blurb =
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec quis libero et enim dignissim venenatis a facilisis eros. Donec commodo nec dolor quis lacinia.'

  return (
    <Main className='bg-gradient-to-br from-light-green/90 from-20% to-dark-green/15'>
      <PageLayout wrapperClassName='max-sm:w-full' className='max-md:px-0'>
        <section className='flex flex-col justify-between gap-16'>
          <div className='flex flex-col gap-6 mt-8 md:mt-20 max-md:px-4'>
            <h1
              className={cn(
                'text-5xl sm:text-6xl md:text-7xl font-display text-balance',
                'text-white text-shadow-sm text-shadow-purple',
                'flex flex-col gap-3',
              )}
            >
              <span>Evy</span>
              <span>Pitt-Stoller.</span>
            </h1>
            <h2 className='flex items-center gap-2 text-xl sm:text-2xl font-medium text-balance text-purple flex-wrap'>
              <span>Writer</span>
              <span className='opacity-25'>|</span>
              <span>Creative Producer</span>
            </h2>
          </div>

          <div className='flex items-end max-sm:flex-col shrink-0'>
            <div
              className={cn(
                'shrink-0 w-full sm:max-w-80 max-sm:self-center',
                'relative md:right-12 md:-ml-16',
              )}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={photo}
                alt='Evy smiling'
                className={cn('w-full h-auto')}
              />
            </div>

            <CardStack
              className={cn(
                'max-sm:w-full max-sm:overflow-x-clip max-sm:bottom-16 max-sm:-mb-12',
                'sm:max-md:top-8 sm:right-8',
                'md:right-8',
              )}
            >
              <div className='p-4 md:p-6 text-pretty flex flex-col gap-8 justify-between pb-8'>
                <p>{blurb}</p>
                <ContactLinks
                  links={{ ...omit(profile?.contactInfo, ['_type']) }}
                />
              </div>
            </CardStack>
          </div>
        </section>
      </PageLayout>

      <section className='bg-pale-purple relative max-sm:z-50__'>
        <div className='h-96'></div>
      </section>
    </Main>
  )
}

export default Page
