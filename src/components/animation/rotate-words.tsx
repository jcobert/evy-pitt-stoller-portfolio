'use client'

import { AnimatePresence, AnimatePresenceProps, motion } from 'motion/react'
import { FC, useEffect, useState } from 'react'

import { cn } from '@/utils/style'

type Props = {
  words: string[]
  text?: string
  className?: string
  wordClassName?: string
} & AnimatePresenceProps

export const RotateWords: FC<Props> = ({
  text,
  words = [],
  className,
  wordClassName,
  ...presenceProps
}) => {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % words.length)
    }, 3000)

    return () => clearInterval(interval)
  }, [words?.length])

  if (!words?.length) return null

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
          className={wordClassName}
        >
          {words?.[index]}
        </motion.span>
      </AnimatePresence>
    </h2>
  )
}
