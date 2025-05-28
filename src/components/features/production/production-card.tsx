import Link from 'next/link'
import { FC } from 'react'

import { formatDate } from '@/utils/date'
import { getSanityVideo } from '@/utils/media'
import { cn } from '@/utils/style'

import PortableBlockContent from '@/components/general/portable-block-content'
import VideoThumbnail from '@/components/media/video-thumbnail'
import { Button } from '@/components/ui/button'

import { PROJECTS_BY_TYPE_QUERYResult } from '@/sanity/types/generated/types'

type Props = {
  production: PROJECTS_BY_TYPE_QUERYResult[number]
  className?: string
}

const ProductionCard: FC<Props> = ({ production, className }) => {
  const { title, datePublished, mainVideo, slug, description } =
    production || {}

  const video = getSanityVideo(mainVideo)

  const videoPageUrl = `/portfolio/production/${slug?.current}`

  return (
    <Link
      href={videoPageUrl}
      className={cn('group w-full flex flex-col items-center gap-3', className)}
    >
      <VideoThumbnail
        video={video}
        className='group-hover:shadow-md transition animate-none'
      />
      <div className='flex flex-col items-center text-pretty'>
        <div className='flex flex-col gap-2 items-center text-pretty'>
          <span className='group-hover:text-foreground/80 transition text-lg font-medium leading-snug'>
            {title}
          </span>
          {datePublished ? (
            <span className='text-xs leading-none text-muted-foreground group-hover:text-muted-foreground/80 transition'>
              {formatDate(datePublished)}
            </span>
          ) : null}
          <div className='text-sm text-pretty fade-out-b max-h-16 overflow-hidden group-hover:text-foreground/80 transition'>
            <PortableBlockContent value={description} />
          </div>
        </div>

        {description ? <Button variant='ghost'>Read more</Button> : null}
      </div>
    </Link>
  )
}

export default ProductionCard
