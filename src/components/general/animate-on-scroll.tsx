'use client'

import { FC, ReactNode } from 'react'

import { cn } from '@/utils/style'

import {
  UseIntersectionOptions,
  useIntersection,
} from '@/hooks/use-intersection'

type Animation = 'fadeIn' | 'slideInFromLeft'

type Props = UseIntersectionOptions & {
  children?: ReactNode
  className?: string
  animations?: Animation[]
}

const animationStyles = {
  fadeIn: cn(
    'opacity-0 blur-lg',
    'data-[visible=true]:opacity-100 data-[visible=true]:blur-none',
  ),
  slideInFromLeft: cn(
    'opacity-0 blur-lg -translate-x-20',
    'data-[visible=true]:opacity-100 data-[visible=true]:blur-none data-[visible=true]:translate-x-0',
  ),
} satisfies { [x in Animation]?: string }

const AnimateOnScroll: FC<Props> = ({
  children,
  className,
  animations,
  threshold = 0.5,
  repeat = false,
  ...options
}) => {
  const [containerRef, isVisible] = useIntersection({
    threshold,
    repeat,
    ...options,
  })

  const presetAnimations = (animations || [])?.map(
    (ani) => animationStyles?.[ani],
  )

  return (
    <div
      ref={containerRef}
      data-visible={isVisible}
      className={cn(
        'transition duration-500 ease-in-out',
        'motion-reduce:transition-none motion-reduce:hover:transform-none',
        presetAnimations,
        className,
      )}
    >
      {children}
    </div>
  )
}

export default AnimateOnScroll
