import VideoSkeleton from './video-skeleton'
import { FC } from 'react'

import { SanityVideo } from '@/utils/media'
import { cn } from '@/utils/style'

type Props = {
  video: SanityVideo | undefined
  className?: string
}

const VideoThumbnail: FC<Props> = ({ video, className }) => {
  const { thumbnailUrl, title } = video || {}

  if (!thumbnailUrl)
    return <VideoSkeleton className={cn('animate-none', className)} />

  return (
    <div
      className={cn(
        'rounded-sm aspect-video w-full contain-content',
        className,
      )}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={thumbnailUrl}
        alt={title}
        className='w-full h-auto aspect-video object-cover object-center'
      />
    </div>
  )
}

export default VideoThumbnail
