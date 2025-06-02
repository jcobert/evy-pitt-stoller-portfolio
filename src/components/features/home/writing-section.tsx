import WritingCard from '../portfolio/writing/writing-card'
import Link from 'next/link'
import { FC } from 'react'

import { cn } from '@/utils/style'

import NoResults from '@/components/general/no-results'
import { Button } from '@/components/ui/button'

import {
  PROJECTS_BY_TYPE_QUERYResult,
  PageHeading,
} from '@/sanity/types/generated/types'

type Props = {
  writing: PROJECTS_BY_TYPE_QUERYResult
  heading: Omit<PageHeading, '_type'> | undefined
}

const WritingSection: FC<Props> = ({ writing, heading }) => {
  const projects = (writing || [])?.slice(0, 4)

  const noProjects = !projects?.length

  return (
    <section className='bg-gradient-to-bl from-secondary-light/20 to-primary relative py-16'>
      <div className='layout px-4 md:px-12 flex flex-col gap-12'>
        <div className='max-w-prose flex flex-col gap-2'>
          <h3 className='text-3xl sm:text-4xl font-medium font-display text-balance text-secondary'>
            {heading?.mainHeading}
          </h3>
          <p className='text-balance text-lg text-secondary/70 md:max-w-xs'>
            {heading?.subheading}
          </p>
        </div>

        {noProjects ? (
          <NoResults
            item='projects'
            className='bg-white/50 border-secondary-light/40'
          />
        ) : (
          <div className='flex flex-col gap-16 items-center'>
            <div
              className={cn(
                'grid grid-cols-1 lg:grid-cols-2 grid-flow-row',
                'gap-x-6 lg:gap-x-10 xl:gap-x-16 gap-y-10',
                'w-full lg:px-10',
              )}
            >
              {projects?.map((prod) => (
                <WritingCard key={prod?._id} writing={prod} className='' />
              ))}
            </div>

            <Button asChild className='w-fit' variant='outline'>
              <Link href='/portfolio/writing'>More projects</Link>
            </Button>
          </div>
        )}
      </div>
    </section>
  )
}

export default WritingSection
