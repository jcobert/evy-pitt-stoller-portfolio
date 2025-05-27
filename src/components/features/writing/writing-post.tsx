import { FC } from 'react'

import { formatDate } from '@/utils/date'
import { getSanityImageUrl } from '@/utils/media'
import { cn } from '@/utils/style'

import PortableBlockContent from '@/components/general/portable-block-content'

import { PROJECT_BY_SLUG_QUERYResult } from '@/sanity/types/generated/types'

type Props = {
  writing: PROJECT_BY_SLUG_QUERYResult | undefined
}

const WritingPost: FC<Props> = ({ writing }) => {
  const { datePublished, mainImage } = writing || {}

  const image = getSanityImageUrl(mainImage, { ratio: '4/3' })

  return (
    <div className='flex flex-col gap-6 sm:gap-8 items-center pb-16'>
      {image ? (
        <div
          className={cn(
            'w-full flex items-center max-w-xl mx-auto h-full aspect-[4/3] rounded-lg shadow-md border-4 border-primary/50',
          )}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={image}
            alt={mainImage?.alt}
            className='rounded-sm object-cover object-center size-full'
          />
        </div>
      ) : null}

      {datePublished ? (
        <span className='text-sm text-muted-foreground'>
          {formatDate(datePublished)}
        </span>
      ) : null}

      <div className='max-w-prose'>
        <PortableBlockContent value={writing?.description} />
      </div>
    </div>
  )
}

export default WritingPost
