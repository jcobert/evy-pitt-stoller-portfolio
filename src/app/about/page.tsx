import { Metadata } from 'next'
import Link from 'next/link'
import { FC } from 'react'

import { getSanityImageUrl } from '@/utils/media'
import { fullName } from '@/utils/string'
import { cn } from '@/utils/style'

import BrandsList from '@/components/brands-list'
import PortableBlockContent from '@/components/general/portable/portable-block-content'
import Heading from '@/components/layout/heading'
import Main from '@/components/layout/main'
import PageLayout from '@/components/layout/page-layout'
import { Button } from '@/components/ui/button'

import { PageParams } from '@/types/general'

import { generatePageMeta } from '@/configuration/seo'
import { getPage, getProfile } from '@/sanity/lib/fetch'

const loadContent = async () => {
  const [aboutPage, profile] = await Promise.all([
    getPage('aboutPage'),
    getProfile(),
  ])

  return { aboutPage, profile }
}

export const generateMetadata = async (): Promise<Metadata> => {
  const { profile, aboutPage } = await loadContent()
  const { heading, seo } = aboutPage || {}

  const title = heading?.mainHeading

  return generatePageMeta({
    title,
    description: seo?.description,
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
  const { profile, aboutPage } = await loadContent()
  const { bio, photo, firstName, lastName, locations } = profile || {}
  const { heading } = aboutPage || {}

  const mainHeading = heading?.mainHeading || 'About Me'
  const subheading = heading?.subheading || ''

  const name = fullName(firstName, lastName)

  const locale = locations?.join(' | ')

  const image = getSanityImageUrl(photo, { ratio: 'original', width: 400 })

  return (
    <Main className='bg-primary-light/70'>
      <PageLayout>
        <Heading
          text={mainHeading}
          description={subheading}
          className='max-lg:mx-auto'
        />

        <section className='flex max-lg:flex-col-reverse max-lg:items-center gap-8 md:gap-y-10 gap-y-6'>
          <PortableBlockContent value={bio} />

          <div className='mx-auto flex flex-col gap-3'>
            <div className='w-3/5 lg:w-full sm:w-1/2__ h-fit max-w-2xs md:min-w-60 max-lg:aspect-square mx-auto border-4 border-white/80 rounded-md bg-secondary-light pointer-events-none'>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={image}
                alt={name}
                className='size-full rounded-sm object-cover object-top max-lg:aspect-square'
              />
            </div>

            <div className='flex flex-col items-center'>
              <p className='text-secondary-light font-medium text-xl'>{name}</p>
              <p className='text-muted-foreground'>{locale}</p>
            </div>
          </div>
        </section>

        <section className='mt-12 max-lg:mx-auto max-w-prose flex flex-col gap-8 w-full'>
          <div className='flex flex-col gap-6'>
            <h3 className='font-semibold text-lg__ text-secondary'>
              Featured In
            </h3>
            <BrandsList
              brands={profile?.companies}
              className={cn(
                'gap-y-6 gap-x-6 overflow-auto',
                'grid grid-flow-row max-md:grid-cols-3',
                'md:grid-cols-4 lg:grid-cols-6',
              )}
              imageClassName={cn(
                'col-span-1 mx-auto',
                'pointer-events-none',
                'size-20 max-w-none rounded-full border border-primary p-2',
              )}
            />
          </div>

          <Button asChild variant='outline' className='mx-auto self-center'>
            <Link href='/portfolio'>View my portfolio</Link>
          </Button>
        </section>
      </PageLayout>
    </Main>
  )
}

export default Page
