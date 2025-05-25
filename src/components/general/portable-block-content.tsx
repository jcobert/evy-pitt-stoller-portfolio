import { PortableText, PortableTextProps } from '@portabletext/react'
import { FC } from 'react'

import { BlockContent } from '@/sanity/types/generated/types'

type Props = Omit<PortableTextProps, 'value'> & {
  value: BlockContent | undefined
}

const PortableBlockContent: FC<Props> = (props) => {
  const { value, ...rest } = props

  if (!value) return null

  return <PortableText value={value} {...rest} />
}

export default PortableBlockContent
