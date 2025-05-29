import { PortableTextComponentProps } from '@portabletext/react'
import { ImQuotesLeft } from 'react-icons/im'

export const PortableQuote = ({
  children,
}: PortableTextComponentProps<unknown>) => {
  return (
    <div className='flex items-start gap-4'>
      <ImQuotesLeft className='text-muted-foreground' />
      <blockquote className='mb-0 text-muted-foreground'>{children}</blockquote>
    </div>
  )
}
