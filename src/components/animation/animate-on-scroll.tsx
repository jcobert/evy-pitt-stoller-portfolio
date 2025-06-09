'use client'

import { FC, ReactNode, useEffect, useState } from 'react'

import { cn } from '@/utils/style'

import {
  UseIntersectionOptions,
  useIntersection,
} from '@/hooks/use-intersection'

type Animation =
  | 'fadeIn'
  | 'blurIn'
  | 'slideInFromLeft'
  | 'slideInFromRight'
  | 'slideInFromTop'
  | 'slideInFromBottom'

type Props = UseIntersectionOptions & {
  children?: ReactNode
  className?: string
  animations?: Animation[]
}

const animationStyles = {
  fadeIn: cn('data-[visible=false]:opacity-0', 'opacity-100'),
  blurIn: cn('data-[visible=false]:blur-lg', 'blur-none'),
  slideInFromLeft: cn('data-[visible=false]:-translate-x-20', 'translate-x-0'),
  slideInFromRight: cn('data-[visible=false]:translate-x-20', 'translate-x-0'),
  slideInFromTop: cn('data-[visible=false]:-translate-y-5', 'translate-y-0'),
  slideInFromBottom: cn('data-[visible=false]:translate-y-5', 'translate-y-0'),
} satisfies { [x in Animation]?: string }

const AnimateOnScroll: FC<Props> = ({
  children,
  className,
  animations,
  threshold = 0.25,
  repeat = false,
  ...options
}) => {
  const [isMounted, setIsMounted] = useState(false)
  const [containerRef, isVisible] = useIntersection({
    threshold,
    repeat,
    ...options,
  })

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const presetAnimations = (animations || [])?.map(
    (ani) => animationStyles?.[ani],
  )

  if (!isMounted) {
    return (
      <div data-visible={true} className={cn(className)}>
        {children}
      </div>
    )
  }

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
