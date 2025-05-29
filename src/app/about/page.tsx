import { Metadata } from 'next'
import { FC } from 'react'

import { getSanityImageUrl } from '@/utils/media'
import { fullName } from '@/utils/string'

import PortableBlockContent from '@/components/general/portable/portable-block-content'
import Heading from '@/components/layout/heading'
import Main from '@/components/layout/main'
import PageLayout from '@/components/layout/page-layout'

import { PageParams } from '@/types/general'

import { generatePageMeta } from '@/configuration/seo'
import { getProfile } from '@/sanity/lib/fetch'

const fetchContent = async () => {
  const profile = await getProfile()
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
  const { bio, photo, firstName, lastName, locations } = profile || {}

  const name = fullName(firstName, lastName)

  const locale = locations?.join(' | ')

  const image = getSanityImageUrl(photo, { ratio: 'original', width: 400 })

  return (
    <Main className='bg-pale-yellow'>
      <PageLayout>
        <Heading text='About Me' className='max-lg:mx-auto' />

        <section className='flex max-lg:flex-col-reverse max-lg:items-center gap-8 md:gap-y-10 gap-y-6'>
          <PortableBlockContent value={bio} />

          <div className='w-full mx-auto flex flex-col gap-3'>
            <div className='w-3/5 lg:w-full sm:w-1/2__ h-fit max-w-2xs md:min-w-60 max-lg:aspect-square mx-auto border-4 border-white/80 rounded-md bg-light-purple'>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={image}
                alt={name}
                className='size-full rounded-sm object-cover object-top max-lg:aspect-square'
              />
            </div>

            <div className='flex flex-col items-center'>
              <p className='text-light-purple font-medium text-xl'>{name}</p>
              <p className='text-muted-foreground'>{locale}</p>
            </div>
          </div>
        </section>
      </PageLayout>
    </Main>
  )
}

export default Page
