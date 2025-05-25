'use client'

import { FC, HTMLProps, useEffect, useState } from 'react'
import { FaRegCirclePlay } from 'react-icons/fa6'
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

const Fallback: FC = () => (
  <div
    className={cn(
      'w-full max-w-full aspect-video bg-black/10 object-cover rounded-sm p-px',
      'relative flex items-center justify-center',
      'animate-pulse',
    )}
  >
    <FaRegCirclePlay className='absolute text-5xl text-black/20' />
  </div>
)

const VideoPlayer: FC<Props> = ({ className, ...props }) => {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) return <Fallback />

  return (
    <ReactPlayer
      controls
      width='100%'
      height='auto'
      wrapper={(p) => <Wrapper {...p} className={className} />}
      fallback={<Fallback />}
      {...props}
    />
  )
}

export default VideoPlayer
