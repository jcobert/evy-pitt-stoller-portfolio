import { FC } from 'react'

import { formatDate } from '@/utils/date'
import { getSanityVideo } from '@/utils/media'
import { cn } from '@/utils/style'

import PortableBlockContent from '@/components/general/portable/portable-block-content'
import VideoPlayer from '@/components/media/video-player'
import VideoThumbnail from '@/components/media/video-thumbnail'

import { PROJECT_BY_SLUG_QUERYResult } from '@/sanity/types/generated/types'

type Props = {
  production: PROJECT_BY_SLUG_QUERYResult | undefined
}

const ProductionPost: FC<Props> = ({ production }) => {
  const { datePublished, mainVideo, mainImage } = production || {}

  const video = getSanityVideo(mainVideo, { thumbnailImage: mainImage })

  return (
    <div className='flex flex-col gap-4 sm:gap-8 items-center'>
      {video?.url ? (
        <div
          className={cn(
            'w-full flex items-center max-w-3xl mx-auto py-2 bg-no-repeat bg-cover h-full bg-center aspect-video rounded-sm',
            'relative',
          )}
          // style={
          //   video?.thumbnailUrl
          //     ? { backgroundImage: `url(${video?.thumbnailUrl})` }
          //     : {}
          // }
        >
          <div className='absolute aspect-video size-full'>
            <VideoThumbnail video={video} icon={false} />
          </div>
          <VideoPlayer video={video} className='animate-fade-in' />
        </div>
      ) : null}
      {datePublished ? (
        <span className='text-sm text-muted-foreground'>
          {formatDate(datePublished)}
        </span>
      ) : null}

      <PortableBlockContent value={production?.description} />
    </div>
  )
}

export default ProductionPost
