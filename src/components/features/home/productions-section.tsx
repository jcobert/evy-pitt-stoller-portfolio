import ProductionCard from '../portfolio/production/production-card'
import Link from 'next/link'
import { FC } from 'react'

import { cn } from '@/utils/style'

import AnimateOnScroll from '@/components/animation/animate-on-scroll'
import NoResults from '@/components/general/no-results'
import { Button } from '@/components/ui/button'

import {
  PROJECTS_BY_TYPE_QUERYResult,
  PageHeading,
} from '@/sanity/types/generated/types'

type Props = {
  productions: PROJECTS_BY_TYPE_QUERYResult
  heading: Omit<PageHeading, '_type'> | undefined
  className?: string
}

const ProductionsSection: FC<Props> = ({ productions, heading, className }) => {
  const projects = (productions || [])?.slice(0, 4)

  const noProjects = !projects?.length

  return (
    <section
      className={cn(
        'bg-gradient-to-br from-secondary/90 to-secondary-light relative max-sm:z-50__ py-16',
        className,
      )}
    >
      <div className='layout px-4 md:px-12 flex flex-col gap-12'>
        {heading ? (
          <AnimateOnScroll animations={['fadeIn', 'blurIn', 'slideInFromLeft']}>
            <div className='max-w-prose flex flex-col gap-2'>
              <h3 className='text-3xl sm:text-4xl font-semibold font-display text-balance text-primary-light'>
                {heading?.mainHeading}
              </h3>
              <p className='text-balance text-lg text-primary/70 md:max-w-xs'>
                {heading?.subheading}
              </p>
            </div>
          </AnimateOnScroll>
        ) : null}

        {noProjects ? (
          <NoResults
            item='projects'
            className='bg-white/85 border-secondary-light'
          />
        ) : (
          <div className='flex flex-col gap-12 items-center'>
            <div
              className={cn(
                'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 grid-flow-row',
                'gap-x-6 lg:gap-x-10 xl:gap-x-16 gap-y-10',
                'px-4 sm:px-16',
              )}
            >
              {projects?.map((prod) => (
                <ProductionCard
                  key={prod?._id}
                  production={prod}
                  className=''
                  showDescription={false}
                  showDate={false}
                  dark
                />
              ))}
            </div>

            <Button asChild className='w-fit' variant='outline'>
              <Link href='/portfolio/production'>More projects</Link>
            </Button>
          </div>
        )}
      </div>
    </section>
  )
}

export default ProductionsSection
