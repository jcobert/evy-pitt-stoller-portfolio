import { FC, ReactNode } from 'react'

import { cn } from '@/utils/style'

type Props = {
  children?: ReactNode
  className?: string
}

const CardStack: FC<Props> = ({ children, className }) => {
  return (
    <div className={className}>
      <div
        className={cn(
          'w-80 min-h-44 right-8 bottom-12',
          'md:w-96 md:min-h-54 rounded-md absolute md:right-12 md:bottom-12 z-20',
          'bg-pale-yellow',
          'shadow-md',
        )}
      >
        {children}
      </div>
      <div
        className={cn(
          'w-84 h-42 right-4 bottom-8',
          'md:w-[26rem] md:h-56 rounded-md absolute md:right-0 md:bottom-4 z-10',
          'bg-light-green',
          'shadow-md',
          '-rotate-3',
        )}
      />
      <div
        className={cn(
          'w-80 h-42',
          'md:w-96 md:h-64 rounded-md md:-mb-4',
          'bg-purple',
          'shadow-2xl',
          'rotate-3',
        )}
      />
    </div>
  )
}

export default CardStack
