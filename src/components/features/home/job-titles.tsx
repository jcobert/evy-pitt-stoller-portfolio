'use client'

import { motion } from 'motion/react'
import { FC } from 'react'

import { cn } from '@/utils/style'

type Props = {
  titles: string[]
  className?: string
}

const JobTitles: FC<Props> = ({ titles }) => {
  if (!titles?.length) return null

  return (
    <motion.h2
      className={cn(
        'flex items-start gap-2 text-xl sm:text-2xl text-balance flex-wrap',
        'text-primary-foreground/65',
      )}
      variants={{
        hidden: { opacity: 0 },
        show: { opacity: 1, transition: { staggerChildren: 0.5 } },
      }}
      initial='hidden'
      animate='show'
    >
      {titles?.map((title, i) => (
        <motion.div
          key={title}
          className='flex items-center gap-2'
          variants={{
            hidden: { opacity: 0 },
            show: { opacity: 1, transition: { staggerChildren: 0.5 } },
          }}
        >
          <span>{title}</span>
          {i < titles?.length - 1 ? (
            <motion.span
              animate={{
                opacity: 0.25,
                transition: { duration: 2 * (i + 1), delay: 0.5 },
              }}
              initial={{ opacity: 0 }}
            >
              |
            </motion.span>
          ) : null}
        </motion.div>
      ))}
    </motion.h2>
  )
}

export default JobTitles
