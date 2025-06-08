'use client'

import { AnimatePresence, AnimatePresenceProps, motion } from 'motion/react'
import { FC, useEffect, useState } from 'react'

import { cn } from '@/utils/style'

type Props = {
  text?: string
  words: string[]
  className?: string
} & AnimatePresenceProps

export const RotateWords: FC<Props> = ({
  text,
  words = [],
  className,
  ...presenceProps
}) => {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % words.length)
    }, 3000)
    // Clean up interval on unmount
    return () => clearInterval(interval)
  }, [words?.length])

  return (
    <h2
      className={cn('flex gap-1 items-baseline', className)}
      aria-label={`${text} ${words?.join(', ')}`}
    >
      {text}{' '}
      <AnimatePresence mode='wait' {...presenceProps}>
        <motion.span
          key={words[index]}
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 40 }}
          transition={{ duration: 0.5 }}
        >
          {words[index]}
        </motion.span>
      </AnimatePresence>
    </h2>
  )
}
