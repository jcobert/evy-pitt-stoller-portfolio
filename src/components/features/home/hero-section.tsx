import { FC } from 'react'

import { getSanityImageUrl } from '@/utils/media'
import { cn } from '@/utils/style'

import CardStack from '@/components/general/card-stack'
import ContactLinks from '@/components/general/contact-links'

import { HomePage, PROFILE_QUERYResult } from '@/sanity/types/generated/types'

type Props = {
  profile: PROFILE_QUERYResult | undefined
  welcomeBlurb: HomePage['welcomeBlurb']
}

const HereoSection: FC<Props> = ({ profile, welcomeBlurb }) => {
  const firstName = profile?.firstName || 'Evy'
  const lastName = profile?.lastName || 'Pitt-Stoller'

  const titles = profile?.titles?.length
    ? profile?.titles
    : ['Writer', 'Creative Producer']

  const photo = getSanityImageUrl(profile?.photo, {
    ratio: 'original',
  })

  return (
    <section className='flex flex-col justify-between gap-16'>
      <div className='flex flex-col gap-6 mt-8 md:mt-20 max-md:px-4'>
        <h1
          className={cn(
            'text-5xl sm:text-6xl md:text-7xl font-display text-balance',
            'text-white text-shadow-sm text-shadow-secondary',
            'flex flex-col gap-3',
          )}
        >
          <span>{firstName}</span>
          <span>{`${lastName}.`}</span>
        </h1>
        <h2 className='flex items-start gap-2 text-xl sm:text-2xl font-medium text-balance text-secondary flex-wrap overflow-hidden fade-out-r'>
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
          <img src={photo} alt='Evy smiling' className={cn('w-full h-auto')} />
        </div>

        <CardStack
          className={cn(
            'max-sm:w-full max-sm:overflow-x-clip max-sm:bottom-16 max-sm:-mb-12',
            'sm:max-md:top-8 sm:right-8',
            'md:right-8',
          )}
        >
          <div className='p-4 md:p-6 text-pretty flex flex-col gap-8 justify-between pb-8'>
            {welcomeBlurb ? <p>{welcomeBlurb}</p> : null}
            <ContactLinks
              links={{
                linkedIn: profile?.contactInfo?.linkedIn,
                twitter: profile?.contactInfo?.twitter,
                email: profile?.contactInfo?.email,
                phone: profile?.contactInfo?.phone,
              }}
            />
          </div>
        </CardStack>
      </div>
    </section>
  )
}

export default HereoSection
