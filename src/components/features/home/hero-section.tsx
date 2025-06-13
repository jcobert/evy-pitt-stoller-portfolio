import JobTitles from './job-titles'
import ProjectCarousel from './project-carousel'
import { FC } from 'react'

import { getSanityImageUrl } from '@/utils/media'
import { getFullName } from '@/utils/string'
import { cn } from '@/utils/style'

import CardStack from '@/components/general/card-stack'
import ContactLinks from '@/components/general/contact-links'
import Separator from '@/components/general/separator'

import {
  HomePage,
  PROFILE_QUERYResult,
  PROJECT_COLLECTIONS_QUERYResult,
} from '@/sanity/types/generated/types'

type Props = {
  profile: PROFILE_QUERYResult | undefined
  welcomeBlurb: HomePage['welcomeBlurb']
  className?: string
  collections: PROJECT_COLLECTIONS_QUERYResult | undefined | null
}

const HereoSection: FC<Props> = ({
  profile,
  welcomeBlurb,
  className,
  collections,
}) => {
  const firstName = profile?.firstName || 'Evy'
  const lastName = profile?.lastName || 'Pitt-Stoller'
  const fullName = getFullName(firstName, lastName)

  const nameIsUppercase = fullName?.toUpperCase() === fullName

  const titles = profile?.titles?.length
    ? profile?.titles
    : ['Writer', 'Creative Producer']

  const photo = getSanityImageUrl(profile?.photo, {
    ratio: 'original',
    quality: 85,
  })

  return (
    <section className={cn('flex justify-between items-end', className)}>
      <div
        className={cn(
          'flex flex-col justify-between gap-16 w-full',
          'xl:w-fit',
        )}
      >
        <div className='flex flex-col gap-2 sm:gap-6 mt-8 md:mt-20 max-md:px-4 max-md:items-center'>
          <h1
            className={cn(
              'flex flex-col gap-3 w-fit',
              'text-4xl sm:text-6xl md:text-7xl font-display font-bold text-balance',
              'text-transparent bg-clip-text bg-gradient-to-r from-secondary from-40% to-secondary-light',
              'pb-2 md:pb-3',
              'animate-shimmer',
              'bg-no-repeat',
              nameIsUppercase &&
                'text-3xl sm:text-5xl md:text-6xl sm:pb-0 md:pb-0',
            )}
          >
            {fullName}
            {/* <span>{firstName}</span>
          <span>{`${lastName}.`}</span> */}
          </h1>
          {/* <h2
          className={cn(
            'flex items-start gap-2 text-xl sm:text-2xl text-balance flex-wrap',
            // 'text-secondary',
            // 'text-secondary-light',
            // 'text-secondary/70',
            'text-primary-foreground/65',
          )}
        >
          {titles?.map((title, i) => (
            <div key={title} className='flex items-center gap-2'>
              <span>{title}</span>
              {i < titles?.length - 1 ? (
                <span aria-hidden className='opacity-25'>
                  |
                </span>
              ) : null}
            </div>
          ))}
        </h2> */}

          <JobTitles titles={titles} />
        </div>

        <div className='flex items-end max-sm:flex-col shrink-0'>
          <div
            className={cn(
              'shrink-0 w-full sm:max-w-80 max-sm:self-center',
              'relative md:right-12 md:-ml-16',
              'pointer-events-none',
            )}
          >
            {photo ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={photo}
                alt='Evy smiling'
                className={cn('w-full h-auto')}
              />
            ) : null}
          </div>

          {!!welcomeBlurb || !!profile?.contactInfo ? (
            <CardStack
              className={cn(
                'max-sm:w-full max-sm:overflow-x-clip max-sm:bottom-8 max-sm:-mb-4',
                'sm:max-md:top-8 sm:right-8',
                'md:right-8',
              )}
            >
              <div
                className={cn(
                  'p-4 md:p-6 text-pretty flex flex-col gap-6 pb-8',
                  'justify-center mx-auto',
                )}
              >
                {welcomeBlurb ? (
                  <p className='text-primary-foreground max-w-prose mx-auto'>
                    {welcomeBlurb}
                  </p>
                ) : null}
                <ContactLinks
                  className='mx-auto'
                  links={{
                    linkedIn: profile?.contactInfo?.linkedIn,
                    twitter: profile?.contactInfo?.twitter,
                    email: profile?.contactInfo?.email,
                    phone: profile?.contactInfo?.phone,
                  }}
                />
              </div>
            </CardStack>
          ) : null}
        </div>
      </div>

      {collections?.length ? (
        <div
          className={cn(
            'max-xl:hidden',
            'flex-1 pr-4 pb-8',
            'flex flex-col gap-4',
          )}
        >
          <h3 className='text-center text-lg leading-tight text-secondary font-medium'>
            Some of My Work
          </h3>
          <Separator className='w-1/3 mx-auto' />
          <ProjectCarousel
            collections={collections}
            className='max-w-3/4 2xl:max-w-2/3'
          />
        </div>
      ) : null}
    </section>
  )
}

export default HereoSection
