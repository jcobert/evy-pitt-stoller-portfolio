import { PortableDivider } from './components/portable-divider'
import { PortableImage } from './components/portable-image'
import { PortableLink } from './components/portable-link'
import { PortableQuote } from './components/portable-quote'
import { PortableVideo } from './components/portable-video'
import {
  PortableText,
  PortableTextComponents,
  PortableTextProps,
} from '@portabletext/react'
import { FC } from 'react'

import { BlockContent } from '@/sanity/types/generated/types'

export const portableComponents: PortableTextComponents = {
  types: {
    image: PortableImage,
    videoEmbed: PortableVideo,
  },
  block: {
    blockquote: PortableQuote,
  },
  marks: {
    divider: PortableDivider,
    link: PortableLink,
  },
}

type Props = Omit<PortableTextProps, 'value'> & {
  value: BlockContent | undefined
}

const PortableBlockContent: FC<Props> = (props) => {
  const { value, ...rest } = props

  if (!value) return null

  return (
    <PortableText value={value} components={portableComponents} {...rest} />
  )
}

export default PortableBlockContent
