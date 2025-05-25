import { getSanityVideo } from './utils'
import Link from 'next/link'
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
  const { title, datePublished, mainVideo, slug } = production || {}

  const video = getSanityVideo(mainVideo)

  const videoPageUrl = `/works/production/${slug?.current}`

  return (
    <div
      className={cn('group w-full flex flex-col items-center gap-3', className)}
    >
      <VideoPlayer url={video?.url} />
      <Link
        href={videoPageUrl}
        className='flex flex-col gap-2 items-center text-pretty'
      >
        <span className='group-hover:text-foreground/80 transition'>
          {title}
        </span>
        {datePublished ? (
          <span className='text-sm text-muted-foreground group-hover:text-muted-foreground/80 transition'>
            {formatDate(datePublished)}
          </span>
        ) : null}
      </Link>
    </div>
  )
}

export default ProductionCard
