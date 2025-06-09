import Link from 'next/link'
import { FC } from 'react'

import { formatDate } from '@/utils/date'
import { getSanityImageUrl, getSanityVideo } from '@/utils/media'
import { cn } from '@/utils/style'

import Logo from '@/components/general/logo'
import PortableBlockContent from '@/components/general/portable/portable-block-content'
import VideoThumbnail from '@/components/media/video-thumbnail'
import { Button } from '@/components/ui/button'

import { PROJECT_COLLECTIONS_QUERYResult } from '@/sanity/types/generated/types'

type Props = {
  collection: PROJECT_COLLECTIONS_QUERYResult[number]
  className?: string
}

const CollectionCard: FC<Props> = ({ collection, className }) => {
  const { title, description, mainImage, projects, slug } = collection || {}

  const pageUrl = `/portfolio/collections/${slug?.current}`

  const imageSquare = getSanityImageUrl(mainImage, {
    ratio: 'square',
    width: 400,
  })
  const imageWide = getSanityImageUrl(mainImage, { ratio: '16/9', width: 400 })

  return (
    <Link
      href={pageUrl}
      className={cn(
        'group w-full flex flex-col items-center gap-3 border bg-primary',
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
        >
          
          <img
            src={imageSquare}
            alt={mainImage?.alt}
            className={cn(
              'max-sm:hidden',
              'aspect-square object-cover rounded-sm rounded-r-none h-auto',
            )}
          />
          
          <img
            src={imageWide}
            alt={mainImage?.alt}
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

      <div className='flex flex-col items-center text-pretty'>
        <div className='flex flex-col gap-2 items-center text-pretty'>
          <span
            className={cn(
              'transition text-lg font-medium leading-snug',
              'text-primary-foreground group-hover:text-primary-foreground/80',
            )}
          >
            {title}
          </span>

          {/* <PortableBlockContent
            value={description}
            prose={false}
            preview
            className='text-sm text-pretty fade-out-b max-h-16 overflow-hidden group-hover:text-primary-foreground/80 transition'
          /> */}
        </div>
      </div>
    </Link>
  )
}

export default CollectionCard
