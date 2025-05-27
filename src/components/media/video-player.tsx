'use client'

import VideoThumbnail from './video-thumbnail'
import { FC, HTMLProps, useEffect, useState } from 'react'
import { ImSpinner8 } from 'react-icons/im'
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

const Spinner: FC = () => {
  return (
    <div className='absolute size-fit max-w-screen overflow-hidden z-5 left-[calc(50%-1.5rem)] sm:left-[calc(50%-2rem)]'>
      <ImSpinner8 className='fill-white/55 animate-spin size-12 sm:size-16' />
    </div>
  )
}

const VideoPlayer: FC<Props> = ({ video, className, ...props }) => {
  const [isMounted, setIsMounted] = useState(false)
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted)
    return (
      <>
        <Spinner />
        <VideoThumbnail video={video} />
      </>
    )

  return (
    <>
      {!isReady ? <Spinner /> : null}
      <ReactPlayer
        controls
        width='100%'
        height='auto'
        wrapper={(p) => <Wrapper {...p} className={className} />}
        fallback={<VideoThumbnail video={video} />}
        url={video?.url}
        onReady={() => {
          setIsReady(true)
        }}
        {...props}
      />
    </>
  )
}

export default VideoPlayer
