import { FC, ReactNode } from 'react'

import { cn } from '@/utils/style'

type Props = {
  children: ReactNode
  className?: string
}

const Ticker: FC<Props> = ({ children, className }) => {
  return (
    <div className={cn('flex w-full overflow-hidden', className)}>
      <div className='animate-infinite-scroll flex'>
        <div className='w-full flex-none overflow-hidden'>{children}</div>
        <div className='w-full flex-none overflow-hidden'>{children}</div>
      </div>
    </div>
  )
}

export default Ticker
