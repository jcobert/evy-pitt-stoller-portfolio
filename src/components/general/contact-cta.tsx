import { Button, type ButtonProps } from '../ui/button'
import Link from 'next/link'
import { FC } from 'react'

import { cn } from '@/utils/style'

type Props = ButtonProps

export const CONTACT_CTA_LINK = '/contact'

const ContactCta: FC<Props> = ({ className, ...props }) => {
  return (
    <Button
      asChild
      variant='outline'
      className={cn('w-fit', className)}
      {...props}
    >
      <Link href={CONTACT_CTA_LINK}>{"Let's talk"}</Link>
    </Button>
  )
}

export default ContactCta
