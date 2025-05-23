import { FC } from 'react'

import { cn } from '@/utils/style'

import CardStack from '@/components/general/card-stack'
import ContactLinks from '@/components/general/contact-links'
import Main from '@/components/layout/main'
import PageLayout from '@/components/layout/page-layout'

const Page: FC = () => {
  return (
    <Main className='bg-gradient-to-br from-20% to-dark-green/15'>
      <PageLayout wrapperClassName='max-sm:w-full' className='max-md:px-0'>
        <section className='flex flex-col justify-between min-h-screen__ gap-16'>
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

          <div className='flex items-end max-md:self-center__ max-sm:flex-col shrink-0'>
            <div
              className={cn(
                'shrink-0 w-full sm:max-w-80 max-sm:self-center',
                'relative md:right-12 xl:right-24__ md:-ml-16',
              )}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={'/images/eps-headshot.png'}
                alt='Evy smiling'
                className={cn('w-full h-auto')}
              />
            </div>

            <CardStack className='relative sm:right-8 max-md:top-8 md:right-8 max-sm:hidden'>
              <div className='p-4 md:p-6 text-pretty flex flex-col gap-6'>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
                  quis libero et enim dignissim venenatis a facilisis eros.
                  Donec commodo nec dolor quis lacinia.
                </p>
                <ContactLinks
                  links={{ linkedIn: '', twitter: '', email: 'asdf' }}
                />
              </div>
            </CardStack>
          </div>
        </section>
      </PageLayout>

      <section className='bg-pale-purple relative z-50'>
        <div className='h-96'></div>
      </section>
    </Main>
  )
}

export default Page
