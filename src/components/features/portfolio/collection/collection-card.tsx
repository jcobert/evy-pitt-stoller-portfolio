import Link from 'next/link'
import { FC } from 'react'

import { getSanityImageUrl, getSanityVideo } from '@/utils/media'
import { cn } from '@/utils/style'

import AnimateOnScroll from '@/components/animation/animate-on-scroll'
import Logo from '@/components/general/logo'

import { PROJECT_COLLECTIONS_QUERYResult } from '@/sanity/types/generated/types'

type Props = {
  collection: PROJECT_COLLECTIONS_QUERYResult[number]
  className?: string
  animate?: boolean
}

const CollectionCard: FC<Props> = ({
  collection,
  className,
  animate = true,
}) => {
  const { title, mainImage, slug, sections } = collection || {}
  const pageUrl = `/portfolio/collections/${slug?.current}`

  const allProjects = sections?.flatMap((sec) => sec?.projects)?.filter(Boolean)
  const allSeries = sections?.flatMap((sec) => sec?.series)?.filter(Boolean)

  const imageAsset =
    mainImage ||
    allProjects?.[0]?.mainImage ||
    allSeries?.[0]?.mainImage ||
    allSeries?.[0]?.projects?.[0]?.mainImage

  const imageUrl =
    getSanityImageUrl(imageAsset, {
      ratio: '16/9',
      width: 400,
    }) || getSanityVideo(allProjects?.[0]?.mainVideo)?.thumbnailUrl

  const projectCount = (allProjects?.length || 0) + (allSeries?.length || 0)

  return (
    <AnimateOnScroll
      animations={animate ? ['slideInFromBottom', 'fadeIn'] : undefined}
      className={cn(
        'duration-500',
        'group rounded-xl bg-primary-light overflow-hidden pb-3 border border-secondary-light',
        'transition hover:shadow-lg hover:border-secondary',
        className,
      )}
      threshold={0.1}
    >
      <Link
        href={pageUrl}
        // className={cn(
        //   'group rounded-xl bg-primary-light overflow-hidden pb-3 border border-secondary-light',
        //   'transition hover:shadow-lg hover:border-secondary',
        //   className,
        // )}
      >
        <div className='p-2 w-full bg-gradient-to-tl from-secondary to-secondary-light rounded-t-lg'>
          <div
            className='w-full rounded-t-md overflow-hidden relative aspect-video flex items-center justify-center'
            aria-hidden={!imageAsset?.alt}
          >
            {imageUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={imageUrl}
                alt={imageAsset?.alt}
                className='w-full object-cover'
              />
            ) : (
              <Logo className='opacity-70 size-16 text-xl' />
            )}
          </div>
        </div>

        <div className='flex flex-col gap-2 justify-center items-center py-2'>
          <div
            className={cn(
              'text-xl leading-tight font-medium font-display text-center text-balance text-primary-foreground w-full',
              'transition group-hover:text-secondary',
            )}
          >
            {title}
          </div>

          <span className='text-xs text-accent-foreground'>{`${projectCount} project${projectCount === 1 ? '' : 's'}`}</span>

          {/* <Button asChild variant='outline' className='px-8'>
          <span>View</span>
        </Button> */}
        </div>
      </Link>
    </AnimateOnScroll>
  )
}

export default CollectionCard
