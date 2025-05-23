import { Button, type ButtonProps } from '../ui/button'
import Link from 'next/link'
import { FC } from 'react'

import { cn } from '@/utils/style'

type Props = ButtonProps

const ContactCta: FC<Props> = ({ className, ...props }) => {
  return (
    <Button asChild className={cn('w-fit', className)} {...props}>
      <Link href='/contact'>{"Let's talk"}</Link>
    </Button>
  )
}

export default ContactCta
