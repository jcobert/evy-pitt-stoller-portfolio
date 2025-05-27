import { FC } from 'react'

import { formatDate } from '@/utils/date'
import { getSanityVideo } from '@/utils/media'

import PortableBlockContent from '@/components/general/portable-block-content'
import VideoPlayer from '@/components/media/video-player'

import { PROJECT_BY_SLUG_QUERYResult } from '@/sanity/types/generated/types'

type Props = {
  production: PROJECT_BY_SLUG_QUERYResult | undefined
}

const ProductionPost: FC<Props> = ({ production }) => {
  const { datePublished, mainVideo } = production || {}

  const video = getSanityVideo(mainVideo)

  return (
    <div className='flex flex-col gap-4 sm:gap-8 items-center pb-16'>
      {video?.url ? (
        <div
          className='w-full flex items-center max-w-3xl mx-auto py-2 bg-no-repeat bg-cover h-full bg-center aspect-video rounded-sm'
          style={
            video?.thumbnailUrl
              ? { backgroundImage: `url(${video?.thumbnailUrl})` }
              : {}
          }
        >
          <VideoPlayer video={video} />
        </div>
      ) : null}
      {datePublished ? (
        <span className='text-sm text-muted-foreground'>
          {formatDate(datePublished)}
        </span>
      ) : null}
      <div className='max-w-prose'>
        <PortableBlockContent value={production?.description} />
      </div>
    </div>
  )
}

export default ProductionPost
