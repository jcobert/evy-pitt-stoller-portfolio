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

import { cn } from '@/utils/style'

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

const previewComponents = {
  types: {
    image: () => null,
    videoEmbed: () => null,
  },
  block: {
    blockquote: () => null,
  },
  marks: {
    divider: () => null,
    link: () => null,
  },
} satisfies PortableTextComponents

type Props = Omit<PortableTextProps, 'value'> & {
  value: BlockContent | undefined | null
  prose?: boolean
  className?: string
  preview?: boolean
}

const PortableBlockContent: FC<Props> = ({
  value,
  prose = true,
  className,
  preview = false,
  ...rest
}) => {
  if (!value) return null

  return (
    <div
      className={cn(
        prose &&
          'text-pretty prose prose-h4:text-purple prose-h3:text-muted-foreground',
        className,
      )}
    >
      <PortableText
        value={preview ? value?.slice(0, 5) : value}
        components={preview ? previewComponents : portableComponents}
        {...rest}
      />
    </div>
  )
}

export default PortableBlockContent
