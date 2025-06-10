import Link from 'next/link'
import { FC } from 'react'

import { getSanityImageUrl, getSanityVideo } from '@/utils/media'
import { cn } from '@/utils/style'

import Tag from '@/components/general/tag'
import VideoThumbnail from '@/components/media/video-thumbnail'
import { Button } from '@/components/ui/button'

import { PROJECT_COLLECTION_BY_SLUG_QUERYResult } from '@/sanity/types/generated/types'

type Props = {
  series:
    | NonNullable<
        NonNullable<PROJECT_COLLECTION_BY_SLUG_QUERYResult>['series']
      >[number]
    | undefined
  className?: string
}

const SeriesCard: FC<Props> = ({ series, className }) => {
  const { title, description, mainImage, projects } = series || {}

  const keyProject = projects?.find((proj) => proj?.mainVideo)

  const imageAsset = mainImage || keyProject?.mainImage

  const video = getSanityVideo(keyProject?.mainVideo, {
    thumbnailImage: getSanityImageUrl(keyProject?.mainImage, {
      ratio: '16/9',
      width: 400,
    }),
  })

  // const imageUrl =
  //   getSanityImageUrl(imageAsset, {
  //     ratio: '16/9',
  //     width: 400,
  //   }) || video?.thumbnailUrl

  return (
    <div
      className={cn('group w-full flex flex-col items-center gap-3', className)}
    >
      <VideoThumbnail
        video={video}
        className='group-hover:shadow-md shadow transition animate-none border-secondary/75'
      />
      <Tag className='bg-secondary text-primary-light text-xs px-4 py-0.5'>
        Series
      </Tag>
      <div className='flex flex-col items-center text-pretty gap-4'>
        <div className='flex flex-col gap-2 items-center text-pretty'>
          <span
            className={cn(
              'transition text-lg_ font-medium leading-snug',
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

        <Button variant='outline'>View series</Button>
      </div>
    </div>

    // <div
    //   className={cn(
    //     'group rounded-xl bg-primary-light overflow-hidden pb-3 border border-secondary-light',
    //     'transition hover:shadow-lg hover:border-secondary',
    //     className,
    //   )}
    // >
    //   <div className='p-2 w-full bg-gradient-to-tl from-secondary to-secondary-light rounded-t-lg'>
    //     <div className='w-full rounded-t-md overflow-hidden relative aspect-video flex items-center justify-center'>
    //       {imageUrl ? (
    //         // eslint-disable-next-line @next/next/no-img-element
    //         <img
    //           src={imageUrl}
    //           alt={imageAsset?.alt || series?.title}
    //           className='w-full object-cover'
    //         />
    //       ) : (
    //         <Logo className='opacity-70 size-16 text-xl' />
    //       )}
    //     </div>
    //   </div>

    //   <div className='flex flex-col gap-2 justify-center items-center py-2'>
    //     <div
    //       className={cn(
    //         'text-xl leading-tight font-medium font-display text-center text-balance text-primary-foreground w-full',
    //         'transition group-hover:text-secondary',
    //       )}
    //     >
    //       {title}
    //     </div>

    //     <PortableBlockContent
    //       value={description}
    //       prose={false}
    //       preview
    //       className='text-sm text-pretty fade-out-b max-h-16 overflow-hidden group-hover:text-primary-foreground/80 transition'
    //     />

    //     <span className='text-xs text-accent-foreground'>{`${projects?.length} project${(projects?.length || 0) === 1 ? '' : 's'}`}</span>

    //     {/* <Button asChild variant='outline' className='px-8'>
    //       <span>View</span>
    //     </Button> */}
    //   </div>
    // </div>
  )
}

export default SeriesCard
