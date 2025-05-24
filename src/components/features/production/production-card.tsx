import { FC } from 'react'

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
    <div className={cn('w-full flex flex-col items-center gap-2', className)}>
      <div className='w-11/12 sm:w-72 max-w-full aspect-video bg-primary object-cover rounded-sm p-px'>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={null!} alt='' className='rounded-sm size-full' />
      </div>

      <div className='flex flex-col gap-2 items-center text-pretty'>
        <span>{title}</span>
        {datePublished ? (
          <span className='text-sm text-muted-foreground'>
            {formatDate(datePublished)}
          </span>
        ) : null}
      </div>
    </div>
  )
}

export default ProductionCard
