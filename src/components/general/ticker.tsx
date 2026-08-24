'use client'

import { FC, ReactNode, useEffect, useState } from 'react'

import { cn } from '@/utils/style'

type Props = {
  children: ReactNode
  /** Total number of items in ticker. */
  itemCount: number
  /** Number of seconds each item should take to pass across. @default 3 */
  itemDuration?: number
  className?: string
}

const Ticker: FC<Props> = ({
  children,
  itemCount,
  itemDuration = 3,
  className,
}) => {
  // Only trigger animation after client hydration.
  const [isMounted, setIsMounted] = useState(false)
  useEffect(() => {
    setIsMounted(true)
  }, [])

  const totalDuration = itemCount * itemDuration

  return (
    <div className={cn('flex w-full overflow-hidden', className)}>
      <div
        className={cn(
          'flex will-change-transform',
          isMounted && 'animate-infinite-scroll',
        )}
        style={{ animationDuration: `${totalDuration}s` }}
      >
        <div className='w-full flex-none overflow-hidden'>{children}</div>
        <div className='w-full flex-none overflow-hidden'>{children}</div>
        <div className='w-full flex-none overflow-hidden'>{children}</div>
      </div>
    </div>
  )
}

export default Ticker
