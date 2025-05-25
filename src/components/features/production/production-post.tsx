import { getSanityVideo } from './utils'
import { FC } from 'react'

import { formatDate } from '@/utils/date'

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
    <div className='flex flex-col gap-4 sm:gap-8 items-center'>
      <VideoPlayer url={video?.url} className='max-w-3xl mx-auto' />
      <span className='text-sm text-muted-foreground'>
        {formatDate(datePublished)}
      </span>
      <div className='max-w-prose'>
        <PortableBlockContent value={production?.description} />
      </div>
    </div>
  )
}

export default ProductionPost
