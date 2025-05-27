import { FC } from 'react'
import { FaRegCirclePlay } from 'react-icons/fa6'

import { cn } from '@/utils/style'

export type VideoSkeletonProps = {
  className?: string
  icon?: boolean
}

const VideoSkeleton: FC<VideoSkeletonProps> = ({ className, icon = true }) => {
  return (
    <div
      aria-hidden
      className={cn(
        'w-full max-w-full aspect-video bg-black/10 object-cover rounded-sm p-px',
        'relative flex items-center justify-center',
        'animate-pulse',
        className,
      )}
    >
      <FaRegCirclePlay
        className={cn('absolute text-5xl text-black/20', !icon && 'invisible')}
      />
    </div>
  )
}

export default VideoSkeleton
