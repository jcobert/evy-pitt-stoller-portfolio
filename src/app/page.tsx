import { FC } from 'react'

import { cn } from '@/utils/style'

import PageLayout from '@/components/layout/page-layout'

const Page: FC = () => {
  return (
    <PageLayout>
      <div className='flex flex-col gap-4'>
        <h1
          className={cn(
            'text-5xl sm:text-6xl md:text-7xl font-display text-balance',
            'text-white text-shadow-sm text-shadow-purple',
            'flex flex-col',
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
    </PageLayout>
  )
}

export default Page
