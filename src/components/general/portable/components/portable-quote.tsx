import { PortableTextComponentProps } from '@portabletext/react'
import { ImQuotesLeft } from 'react-icons/im'

export const PortableQuote = ({
  children,
}: PortableTextComponentProps<unknown>) => {
  return (
    <div className='flex items-start gap-4'>
      <ImQuotesLeft className='text-brand-gray-medium' />
      <blockquote className='mb-0'>{children}</blockquote>
    </div>
  )
}
