import { FC, ReactNode } from 'react'

import { cn } from '@/utils/style'

type Props = {
  children?: ReactNode
  className?: string
}

const CardStack: FC<Props> = ({ children, className }) => {
  return (
    <div className={cn('relative', 'flex justify-center', className)}>
      <div
        className={cn(
          'absolute z-30',
          'bg-pale-yellow rounded-md shadow-md',
          'w-[96%] min-h-58 bottom-0',
          'sm:w-80 sm:min-h-44 sm:right-8 sm:bottom-12',
          'md:w-96 md:min-h-54 md:right-12 md:bottom-12',
          'flex',
        )}
      >
        {children}
      </div>
      <div
        className={cn(
          'absolute z-20',
          'bg-light-green rounded-md shadow-md',
          '-rotate-3',
          'w-full h-48 bottom-2',
          'sm:w-84 sm:h-42 sm:right-2 sm:bottom-8',
          'md:w-[26rem] md:h-56 md:right-0 md:bottom-4',
        )}
      />
      <div
        className={cn(
          'relative z-10',
          'bg-purple rounded-md shadow-2xl',
          'rotate-1 sm:rotate-3',
          'w-full h-42 -bottom-4',
          'sm:w-80 sm:h-42 sm:bottom-4',
          'md:w-96 md:h-64 md:top-2',
        )}
      />
    </div>
  )
}

export default CardStack
