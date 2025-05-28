import ProductionCard from '../portfolio/production/production-card'
import Link from 'next/link'
import { FC } from 'react'

import { cn } from '@/utils/style'

import NoResults from '@/components/general/no-results'
import { Button } from '@/components/ui/button'

import { PROJECTS_BY_TYPE_QUERYResult } from '@/sanity/types/generated/types'

type Props = {
  productions: PROJECTS_BY_TYPE_QUERYResult
}

const ProductionsSection: FC<Props> = ({ productions }) => {
  const prods = (productions || [])?.slice(0, 4)

  const noProds = !prods?.length

  return (
    <section className='bg-pale-purple relative max-sm:z-50__ py-16'>
      <div className='layout px-4 md:px-12 flex flex-col gap-12'>
        <div className='max-w-prose flex flex-col gap-2'>
          <h3 className='text-3xl sm:text-4xl font-medium font-display text-balance text-dark-green'>
            Production
          </h3>
          <p className='text-balance text-lg text-dark-green/80 md:max-w-xs'>
            {"Check out some of the awesome projects I've worked on!"}
          </p>
        </div>

        {noProds ? (
          <NoResults
            item='projects'
            className='bg-white/50 border-light-purple/40'
          />
        ) : (
          <div className='flex flex-col gap-12 items-center'>
            <div
              className={cn(
                'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 grid-flow-row',
                'gap-x-6 lg:gap-x-10 xl:gap-x-16 gap-y-10',
                'px-8 sm:px-16',
              )}
            >
              {prods?.map((prod) => (
                <ProductionCard
                  key={prod?._id}
                  production={prod}
                  className=''
                  showDescription={false}
                  showDate={false}
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
