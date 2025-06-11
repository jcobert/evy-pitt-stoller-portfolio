import Link from 'next/link'
import { FC } from 'react'

import { formatDate } from '@/utils/date'
import { getSanityVideo } from '@/utils/media'
import { cn } from '@/utils/style'

import PortableBlockContent from '@/components/general/portable/portable-block-content'
import VideoThumbnail from '@/components/media/video-thumbnail'
import { Button } from '@/components/ui/button'

import { PROJECTS_BY_TYPE_QUERYResult } from '@/sanity/types/generated/types'

type Props = {
  production: PROJECTS_BY_TYPE_QUERYResult[number]
  className?: string
  showDescription?: boolean
  showDate?: boolean
  dark?: boolean
}

const ProductionCard: FC<Props> = ({
  production,
  className,
  showDescription = true,
  showDate = true,
  dark = false,
}) => {
  const { title, datePublished, mainVideo, mainImage, slug, description } =
    production || {}

  const video = getSanityVideo(mainVideo, { thumbnailImage: mainImage })

  const videoPageUrl = `/portfolio/production/${slug?.current}`

  const canShowdescription = !!description && showDescription
  const canShowDate = !!datePublished && showDate

  return (
    <Link
      href={videoPageUrl}
      className={cn('group w-full flex flex-col items-center gap-3', className)}
    >
      <VideoThumbnail
        video={video}
        className='group-hover:shadow-md shadow transition animate-none border-secondary/75'
      />
      <div className='flex flex-col items-center text-pretty'>
        <div className='flex flex-col gap-2 items-center text-pretty'>
          <span
            className={cn(
              'transition text-lg_ font-medium leading-snug',
              'text-primary-foreground group-hover:text-primary-foreground/80',
              dark && 'text-primary-light group-hover:text-primary',
            )}
          >
            {title}
          </span>

          {canShowDate ? (
            <span className='text-xs leading-none text-muted-foreground group-hover:text-muted-foreground/80 transition'>
              {formatDate(datePublished)}
            </span>
          ) : null}

          {canShowdescription ? (
            <PortableBlockContent
              value={description}
              prose={false}
              preview
              className='text-xs text-pretty fade-out-b max-h-16 overflow-hidden group-hover:text-primary-foreground/80 transition'
            />
          ) : null}
        </div>

        {canShowdescription ? <Button variant='ghost'>Read more</Button> : null}
      </div>
    </Link>
  )
}

export default ProductionCard
