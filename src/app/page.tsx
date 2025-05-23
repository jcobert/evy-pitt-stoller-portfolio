import { FC } from 'react'

import { cn } from '@/utils/style'

import Main from '@/components/layout/main'
import PageLayout from '@/components/layout/page-layout'

const Page: FC = () => {
  return (
    <Main>
      <PageLayout>
        <section className='flex flex-col justify-between min-h-screen__ gap-16'>
          <div className='flex flex-col gap-4 mt-8 md:mt-20'>
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
            <h2 className='flex items-center gap-2 text-xl font-medium text-purple'>
              <span>Writer</span>
              <span className='opacity-25'>|</span>
              <span>Creative Producer</span>
            </h2>
          </div>

          <div
            className={cn(
              'shrink-0 w-full max-w-80 max-md:self-center',
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
        </section>
      </PageLayout>

      <section className='bg-pale-purple'>
        <div className='h-96'></div>
      </section>
    </Main>
  )
}

export default Page
