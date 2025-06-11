import ProjectCard from '../project-card'
import { FC } from 'react'

import { getSanityImageUrl, getSanityVideo } from '@/utils/media'
import { cn } from '@/utils/style'

import PortableBlockContent from '@/components/general/portable/portable-block-content'
import Tag from '@/components/general/tag'
import VideoThumbnail from '@/components/media/video-thumbnail'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

import { PROJECT_COLLECTION_BY_SLUG_QUERYResult } from '@/sanity/types/generated/types'

type Props = {
  series:
    | NonNullable<
        NonNullable<
          NonNullable<PROJECT_COLLECTION_BY_SLUG_QUERYResult>['sections']
        >[number]['series']
      >[number]
    | undefined
  className?: string
}

const SeriesCard: FC<Props> = ({ series, className }) => {
  const { title, description, projects } = series || {}

  const keyProject = projects?.find((proj) => proj?.mainVideo)

  // const imageAsset = mainImage || keyProject?.mainImage

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
    <Dialog>
      <DialogTrigger className='self-start'>
        <div
          className={cn(
            'group w-full flex flex-col items-center gap-3',
            className,
          )}
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
            </div>

            <Button variant='outline' asChild>
              <span>View series</span>
            </Button>
          </div>
        </div>
      </DialogTrigger>

      <DialogContent className='z-9999 sm:max-w-4xl max-h-11/12 sm:max-h-10/12 overflow-auto py-8 flex flex-col gap-8'>
        <DialogHeader className='flex flex-col gap-3'>
          <DialogTitle className='text-primary-foreground'>{title}</DialogTitle>
          <DialogDescription className='sr-only'>
            View the projects in the series below.
          </DialogDescription>
          <PortableBlockContent value={description} className='text-left' />
        </DialogHeader>

        <div
          className={cn(
            'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 grid-flow-row',
            'gap-x-6 lg:gap-x-10 xl:gap-x-16 gap-y-10',
            'px-4 sm:px-12',
          )}
        >
          {projects?.map((proj) => (
            <ProjectCard
              key={proj?._id}
              project={proj}
              showDescription={false}
            />
          ))}
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default SeriesCard
