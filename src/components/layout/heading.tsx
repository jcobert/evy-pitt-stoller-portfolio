import { FC } from 'react'

import { cn } from '@/utils/style'

export type HeadingProps = {
  text?: string
  description?: string
  className?: string
  alignment?: 'left' | 'center' | 'right' | 'dynamic'
}

const Heading: FC<HeadingProps> = ({
  text = '',
  description,
  className,
  alignment = 'dynamic',
}) => {
  return (
    <div className='flex flex-col gap-4 py-6 md:py-10'>
      <h1
        className={cn([
          'text-3xl sm:text-4xl md:text-5xl font-semibold font-display text-balance text-light-purple',
          {
            'text-left': alignment === 'left',
            'text-center': alignment === 'center',
            'text-right': alignment === 'right',
            'text-center md:text-left': alignment === 'dynamic',
          },
          className,
        ])}
      >
        {text}
      </h1>
      {description ? (
        <p className='md:max-w-[40ch] text-balance text-lg sm:text-xl font-medium text-muted-foreground'>
          {description}
        </p>
      ) : null}
    </div>
  )
}

export default Heading
