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
    <div className='flex flex-col gap-4'>
      <h1
        className={cn([
          'text-3xl sm:text-4xl md:text-5xl font-semibold font-heading text-balance text-primary',
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
        <p className='max-w-prose text-pretty text-lg font-medium text-accent-foreground'>
          {description}
        </p>
      ) : null}
    </div>
  )
}

export default Heading
