'use client'

import VideoSkeleton from './video-skeleton'
import { FC, HTMLProps, useEffect, useState } from 'react'
import ReactPlayer, { type ReactPlayerProps } from 'react-player/lazy'

import { cn } from '@/utils/style'

type Props = ReactPlayerProps & { className?: string }

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

const VideoPlayer: FC<Props> = ({ className, ...props }) => {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) return <VideoSkeleton />

  return (
    <ReactPlayer
      controls
      width='100%'
      height='auto'
      wrapper={(p) => <Wrapper {...p} className={className} />}
      fallback={<VideoSkeleton />}
      {...props}
    />
  )
}

export default VideoPlayer
