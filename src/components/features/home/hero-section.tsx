import { FC } from 'react'

import { getSanityImageUrl } from '@/utils/media'
import { getFullName } from '@/utils/string'
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
  const fullName = getFullName(firstName, lastName)

  const nameIsUppercase = fullName?.toUpperCase() === fullName

  const titles = profile?.titles?.length
    ? profile?.titles
    : ['Writer', 'Creative Producer']

  const photo = getSanityImageUrl(profile?.photo, {
    ratio: 'original',
  })

  return (
    <section className='flex flex-col justify-between gap-16'>
      <div className='flex flex-col gap-2 sm:gap-6 mt-8 md:mt-20 max-md:px-4 max-md:items-center'>
        <h1
          className={cn(
            'flex flex-col gap-3 w-fit',
            'text-4xl sm:text-6xl md:text-7xl font-display font-bold text-balance',
            'text-transparent bg-clip-text bg-gradient-to-r from-secondary from-30% to-secondary-light',
            'pb-2 md:pb-3',
            nameIsUppercase &&
              'text-3xl sm:text-5xl md:text-6xl sm:pb-0 md:pb-0',
          )}
        >
          {fullName}
          {/* <span>{firstName}</span>
          <span>{`${lastName}.`}</span> */}
        </h1>
        <h2
          className={cn(
            'flex items-start gap-2 text-xl sm:text-2xl font-medium__ text-balance flex-wrap overflow-hidden__ fade-out-r__',
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
        </h2>
      </div>

      <div className='flex items-end max-sm:flex-col shrink-0'>
        <div
          className={cn(
            'shrink-0 w-full sm:max-w-80 max-sm:self-center',
            'relative md:right-12 md:-ml-16',
            'pointer-events-none',
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
