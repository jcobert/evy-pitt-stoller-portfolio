'use client'

import VideoThumbnail from './video-thumbnail'
import { FC, HTMLProps, useEffect, useState } from 'react'
import ReactPlayer, { type ReactPlayerProps } from 'react-player/lazy'

import { SanityVideo } from '@/utils/media'
import { cn } from '@/utils/style'

type Props = Partial<ReactPlayerProps> & {
  video: SanityVideo | undefined
  className?: string
}

const Wrapper: FC<HTMLProps<HTMLDivElement>> = ({ className, ...props }) => {
  return (
    <div
      {...props}
      className={cn(
        'rounded-sm aspect-video w-full contain-content',
        className,
      )}
    />
  )
}

const VideoPlayer: FC<Props> = ({ video, className, ...props }) => {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) return <VideoThumbnail video={video} />

  return (
    <ReactPlayer
      controls
      width='100%'
      height='auto'
      wrapper={(p) => <Wrapper {...p} className={className} />}
      fallback={<VideoThumbnail video={video} />}
      url={video?.url}
      {...props}
    />
  )
}

export default VideoPlayer
