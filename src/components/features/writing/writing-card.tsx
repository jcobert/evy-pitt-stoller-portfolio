import Link from 'next/link'
import { FC } from 'react'

import { formatDate } from '@/utils/date'
import { getSanityImageUrl } from '@/utils/media'
import { cn } from '@/utils/style'

import { Button } from '@/components/ui/button'

import { PROJECTS_BY_TYPE_QUERYResult } from '@/sanity/types/generated/types'

type Props = {
  writing: PROJECTS_BY_TYPE_QUERYResult[number]
  className?: string
}

const WritingCard: FC<Props> = ({ writing, className }) => {
  const { title, datePublished, mainImage, slug, description } = writing || {}

  const pageUrl = `/portfolio/writing/${slug?.current}`

  const image = getSanityImageUrl(mainImage, { ratio: 'square', width: 400 })

  return (
    <Link
      href={pageUrl}
      className={cn(
        'w-full flex gap-2 lg:gap-4 border rounded-sm',
        'bg-pale-yellow border border-light-green',
        'group hover:shadow-md transition',
        className,
      )}
    >
      {image ? (
        <div className='aspect-square max-w-36 flex-auto rounded-l-sm border-4 border-white/80'>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={image}
            alt={mainImage?.alt}
            className='aspect-square object-cover rounded-l-sm h-full'
          />
        </div>
      ) : null}

      <div className={cn('w-full flex flex-col items-start gap-3 p-4 flex-1')}>
        <div className='group flex flex-col gap-6 items-start text-pretty flex-1'>
          <div className='flex flex-col gap-4 items-start text-pretty flex-1'>
            <span className='group-hover:text-foreground/80 transition md:text-lg font-medium leading-snug'>
              {title}
            </span>
            {datePublished ? (
              <span className='text-xs leading-none text-muted-foreground'>
                {formatDate(datePublished)}
              </span>
            ) : null}
          </div>

          {description ? (
            <Button variant='outline' className='px-6'>
              Read
            </Button>
          ) : null}
        </div>
      </div>
    </Link>
  )
}

export default WritingCard
