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
      // rel={rel}
      // target={target}
      className='inline-flex items-center'
    >
      {children}
      <HiOutlineExternalLink aria-label='This is an external link.' />
    </a>
  )
}
