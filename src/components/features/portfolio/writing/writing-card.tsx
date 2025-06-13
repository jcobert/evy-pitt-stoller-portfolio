import Link from 'next/link'
import { FC } from 'react'

import { formatDate } from '@/utils/date'
import { getSanityImageUrl } from '@/utils/media'
import { cn } from '@/utils/style'

import Logo from '@/components/general/logo'
import { Button } from '@/components/ui/button'

import { PROJECTS_BY_TYPE_QUERYResult } from '@/sanity/types/generated/types'

type Props = {
  writing: PROJECTS_BY_TYPE_QUERYResult[number]
  className?: string
  titleClassName?: string
}

const WritingCard: FC<Props> = ({ writing, className, titleClassName }) => {
  const { title, datePublished, mainImage, slug, description } = writing || {}

  const pageUrl = `/portfolio/writing/${slug?.current}`

  const imageSquare = getSanityImageUrl(mainImage, {
    ratio: 'square',
    width: 400,
  })
  const imageWide = getSanityImageUrl(mainImage, { ratio: '16/9', width: 400 })

  const altText = mainImage?.alt

  return (
    <Link
      href={pageUrl}
      className={cn(
        'w-full flex sm:gap-2 lg:gap-4 border rounded-sm',
        'bg-primary-light border border-secondary-extra-light',
        'group hover:shadow-md transition',
        'flex-wrap',
        'max-sm:flex-col',
        className,
      )}
    >
      {mainImage ? (
        <div
          className={cn(
            'rounded-sm border-4 border-white/80',
            'max-sm:aspect-video max-sm:max-w-full max-sm:w-full max-sm:rounded-b-none max-sm:max-h-7/12',
            'aspect-square self-start max-w-1/3 sm:max-w-48 min-w-24 flex-none sm:rounded-r-none',
            // 'lg:max-w-24',
          )}
          aria-hidden={!altText}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={imageSquare}
            alt={altText}
            className={cn(
              'max-sm:hidden',
              'aspect-square object-cover rounded-sm rounded-r-none h-auto',
            )}
          />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={imageWide}
            alt={altText}
            className={cn(
              'sm:hidden',
              'aspect-video object-cover rounded-sm rounded-b-none size-full',
            )}
          />
        </div>
      ) : (
        <div
          className={cn(
            'aspect-square self-start max-w-1/3 sm:max-w-48 min-w-24 flex-none rounded-sm sm:rounded-r-none border-4 border-white/80',
            'max-sm:aspect-video max-sm:max-w-full max-sm:w-full max-sm:rounded-b-none max-sm:max-h-7/12',
          )}
        >
          <div
            className={cn(
              'max-sm:hidden',
              'aspect-square object-cover rounded-sm rounded-r-none h-auto',
              'w-[11.5rem] flex justify-center items-center bg-secondary-light/10',
            )}
          >
            <Logo className='opacity-70 size-16 text-xl' />
          </div>
          <div
            className={cn(
              'sm:hidden',
              'aspect-video object-cover rounded-sm rounded-b-none size-full',
              'flex justify-center items-center bg-secondary-light/10',
            )}
          >
            <Logo className='opacity-70 size-20 text-2xl' />
          </div>
        </div>
      )}

      <div className={cn('w-full flex flex-col items-start gap-3 p-4 flex-1')}>
        <div
          className={cn(
            'group flex flex-col gap-6 items-start text-pretty flex-1',
            'max-sm:w-full max-sm:items-center',
          )}
        >
          <div
            className={cn(
              'flex flex-col gap-4 items-start text-pretty flex-1',
              'max-sm:w-full max-sm:items-center max-sm:justify-center',
            )}
          >
            <span
              className={cn(
                'text-primary-foreground group-hover:text-primary-foreground/80 transition md:text-lg font-medium leading-snug',
                titleClassName,
              )}
            >
              {title}
            </span>
            {datePublished ? (
              <span className='text-xs leading-none text-muted-foreground'>
                {formatDate(datePublished)}
              </span>
            ) : null}
          </div>

          {description ? (
            <Button variant='outline' className='px-6 max-sm:px-10'>
              Read
            </Button>
          ) : null}
        </div>
      </div>
    </Link>
  )
}

export default WritingCard
