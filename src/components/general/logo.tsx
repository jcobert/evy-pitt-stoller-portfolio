import { FC, HTMLProps } from 'react'

import { cn } from '@/utils/style'

type Props = HTMLProps<HTMLDivElement>

const Logo: FC<Props> = ({ className, ...props }) => {
  return (
    <div
      className={cn(
        'size-12 bg-primary-light border border-primary/50',
        'flex items-center justify-center',
        className,
      )}
      {...props}
    >
      {/* <div className='flex-auto pb-px -mx-1 bg-secondary-light text-center text-white font-display'>
        Evy.
      </div> */}

      <div className='flex-auto flex items-baseline justify-center pb-px -mx-1 bg-secondary-light__ bg-secondary text-center text-white font-display'>
        <span className='leading'>Evy</span>
        <span className='text-2xl leading-0'>.</span>
      </div>
    </div>
  )
}

export default Logo
