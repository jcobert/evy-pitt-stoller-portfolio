import { PortableTextMarkComponentProps } from '@portabletext/react'
import { TypedObject } from 'sanity'

export const PortableDivider = ({
  children,
}: PortableTextMarkComponentProps<TypedObject>) => {
  return (
    <>
      <span>{children}</span>
      <hr className='w-full border-brand-gray-medium/50' />
    </>
  )
}
