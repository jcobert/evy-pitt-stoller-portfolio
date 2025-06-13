import VideoSkeleton, { VideoSkeletonProps } from './video-skeleton'
import { FC } from 'react'

import { SanityVideo } from '@/utils/media'
import { cn } from '@/utils/style'

type Props = {
  video: SanityVideo | undefined
  className?: string
} & Pick<VideoSkeletonProps, 'icon'>

const VideoThumbnail: FC<Props> = ({ video, className, icon }) => {
  const { thumbnailUrl, description } = video || {}

  if (!thumbnailUrl)
    return <VideoSkeleton className={cn(className)} icon={icon} />

  return (
    <div
      className={cn(
        'rounded-sm aspect-video w-full contain-content',
        className,
      )}
      aria-hidden={!description}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={thumbnailUrl}
        alt={description}
        className='w-full h-auto aspect-video object-cover object-center'
      />
    </div>
  )
}

export default VideoThumbnail
