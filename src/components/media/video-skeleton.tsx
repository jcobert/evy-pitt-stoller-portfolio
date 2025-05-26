import { FC } from 'react'
import { FaRegCirclePlay } from 'react-icons/fa6'

import { cn } from '@/utils/style'

type Props = {
  className?: string
}

const VideoSkeleton: FC<Props> = ({ className }) => {
  return (
    <div
      className={cn(
        'w-full max-w-full aspect-video bg-black/10 object-cover rounded-sm p-px',
        'relative flex items-center justify-center',
        'animate-pulse',
        className,
      )}
    >
      <FaRegCirclePlay className='absolute text-5xl text-black/20' />
    </div>
  )
}

export default VideoSkeleton
