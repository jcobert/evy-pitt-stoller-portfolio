import { FC } from 'react'

import { cn } from '@/utils/style'

type Props = {
  className?: string
}

const Separator: FC<Props> = ({ className }) => {
  return (
    <div
      aria-hidden
      className={cn(
        'h-px bg-gradient-to-r from-accent/10 via-primary-foreground/10 to-accent/10',
        className,
      )}
    />
  )
}

export default Separator
