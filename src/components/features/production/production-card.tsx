import { getSanityVideo } from './utils'
import { FC } from 'react'

import { formatDate } from '@/utils/date'
import { cn } from '@/utils/style'

import VideoPlayer from '@/components/media/video-player'

import { PROJECTS_BY_TYPE_QUERYResult } from '@/sanity/types/generated/types'

type Props = {
  production: PROJECTS_BY_TYPE_QUERYResult[number]
  className?: string
}

const ProductionCard: FC<Props> = ({ production, className }) => {
  const { title, datePublished, mainVideo } = production || {}

  const video = getSanityVideo(mainVideo)

  return (
    <div
      // type='button'
      // disabled
      className={cn('group w-full flex flex-col items-center gap-2', className)}
    >
      <VideoPlayer url={video?.url} />
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
    </div>
  )
}

export default ProductionCard
