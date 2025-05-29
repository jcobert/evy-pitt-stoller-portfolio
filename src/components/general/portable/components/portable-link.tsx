import { PortableTextMarkComponentProps } from '@portabletext/react'
import { HiOutlineExternalLink } from 'react-icons/hi'

export const PortableLink = ({
  children,
  value,
}: PortableTextMarkComponentProps<{
  _type: 'blockLink'
  url: string
}>) => {
  if (!value?.url) return <span>{children}</span>

  return (
    <a
      href={value?.url}
      rel='noreferrer nofollow'
      className='inline-flex items-center gap-0.5 text-blue-600 hover:text-blue-600/90 transition'
    >
      {children}
      <HiOutlineExternalLink aria-label='This is an external link.' />
    </a>
  )
}
