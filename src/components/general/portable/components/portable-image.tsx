import { PortableTextComponentProps } from '@portabletext/react'
import { getImageDimensions } from '@sanity/asset-utils'
import { SanityImageAssetDocument } from 'next-sanity'
import Image from 'next/image'

import { urlFor } from '@/sanity/lib/image'

export const PortableImage = ({
  value,
  isInline,
}: PortableTextComponentProps<SanityImageAssetDocument>) => {
  const { width, height } = getImageDimensions(value)
  return (
    <Image
      src={urlFor(value)
        .width(isInline ? 100 : 800)
        .fit('max')
        .auto('format')
        .url()}
      alt={value?.alt || ' '}
      width={width}
      height={height}
      loading='lazy'
      style={{
        // Display alongside text if image appears inside a block text span
        display: isInline ? 'inline-block' : 'block',
        // Avoid jumping around with aspect-ratio CSS property
        aspectRatio: width / height,
      }}
      className='mx-auto max-w-[85vw] md:max-w-md rounded print:max-w-[40%]'
    />
  )
}
