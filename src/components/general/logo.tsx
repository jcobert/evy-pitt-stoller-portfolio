import { FC, HTMLProps } from 'react'

import { cn } from '@/utils/style'

type Props = HTMLProps<HTMLDivElement>

const Logo: FC<Props> = ({ className, ...props }) => {
  return (
    <div className={cn('size-12 bg-white', className)} {...props}>
      logo
    </div>
  )
}

export default Logo
