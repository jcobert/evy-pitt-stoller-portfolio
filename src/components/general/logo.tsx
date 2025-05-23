import { FC, HTMLProps } from 'react'

import { cn } from '@/utils/style'

type Props = HTMLProps<HTMLDivElement>

const Logo: FC<Props> = ({ className, ...props }) => {
  return (
    <div
      className={cn(
        'size-12 bg-pale-yellow',
        'flex items-center justify-center',
        className,
      )}
      {...props}
    >
      <div className='flex-auto pb-px -mx-1 bg-light-purple text-center text-white font-display'>
        Evy.
      </div>
    </div>
  )
}

export default Logo
