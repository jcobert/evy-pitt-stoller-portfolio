import { FC } from 'react'
import { FaRegCirclePlay } from 'react-icons/fa6'

import { formatDate } from '@/utils/date'
import { cn } from '@/utils/style'

import { PROJECTS_QUERYResult, Project } from '@/sanity/types/generated/types'

type Props = {
  production: Project | PROJECTS_QUERYResult[number]
  className?: string
}

const ProductionCard: FC<Props> = ({ production, className }) => {
  const { title, datePublished } = production || {}

  return (
    <button
      type='button'
      disabled
      className={cn('group w-full flex flex-col items-center gap-2', className)}
    >
      <div
        className={cn(
          'w-11/12 sm:w-72 max-w-full aspect-video bg-accent object-cover rounded-sm p-px',
          'relative flex items-center justify-center',
          'group-hover:shadow-sm transition'
        )}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={null!} alt='' className='rounded-sm size-full' />
        <FaRegCirclePlay className='absolute text-5xl text-black/40' />
      </div>

      <div className='flex flex-col gap-2 items-center text-pretty'>
        <span className='group-hover:text-foreground/80 transition'>
          {title}
        </span>
        {datePublished ? (
          <span className='text-sm text-muted-foreground group-hover:text-muted-foreground/80 transition'>
            {formatDate(datePublished)}
          </span>
        ) : null}
      </div>
    </button>
  )
}

export default ProductionCard
