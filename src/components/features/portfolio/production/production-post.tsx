import ProjectCard from '../project-card'
import { FC } from 'react'
import { FaRegCirclePlay } from 'react-icons/fa6'

import { formatDate } from '@/utils/date'
import { getSanityVideo } from '@/utils/media'
import { cn } from '@/utils/style'

import Logo from '@/components/general/logo'
import PortableBlockContent from '@/components/general/portable/portable-block-content'
import Separator from '@/components/general/separator'
import Tag from '@/components/general/tag'
import VideoPlayer from '@/components/media/video-player'
import VideoThumbnail from '@/components/media/video-thumbnail'
import { Button } from '@/components/ui/button'

import {
  PROJECTS_BY_SERIES_QUERYResult,
  PROJECT_BY_SLUG_QUERYResult,
} from '@/sanity/types/generated/types'

type Props = {
  production: PROJECT_BY_SLUG_QUERYResult | undefined
  seriesProjects: PROJECTS_BY_SERIES_QUERYResult | null | undefined
}

const ProductionPost: FC<Props> = ({ production, seriesProjects }) => {
  const { datePublished, mainVideo, mainImage, series, roles, category } =
    production || {}

  const video = getSanityVideo(mainVideo, { thumbnailImage: mainImage })

  const otherProjects = seriesProjects?.filter(
    (proj) => proj?._id !== production?._id,
  )

  const { title: mainCategory, subcategory } = category || {}

  return (
    <div className='flex flex-col gap-4 sm:gap-8 items-center'>
      <div className='flex gap-2 items-center flex-wrap'>
        {mainCategory ? (
          <Tag className='text-secondary border-secondary mb-2 rounded max-sm:text-xs'>
            {mainCategory}
          </Tag>
        ) : null}
        {/* <LuChevronRight className='flex-none mb-2 text-xs text-secondary' /> */}
        {subcategory ? (
          <Tag className='text-secondary border-secondary mb-2 rounded max-sm:text-xs'>
            {subcategory}
          </Tag>
        ) : null}
      </div>

      {video?.url ? (
        <div
          className={cn(
            'w-full flex items-center max-w-3xl mx-auto py-2 bg-no-repeat bg-cover h-full bg-center aspect-video rounded-sm',
            'relative',
          )}
          // style={
          //   video?.thumbnailUrl
          //     ? { backgroundImage: `url(${video?.thumbnailUrl})` }
          //     : {}
          // }
        >
          <div className='absolute aspect-video size-full'>
            <VideoThumbnail video={video} icon={false} />
          </div>
          <VideoPlayer video={video} className='animate-fade-in' />
        </div>
      ) : (
        <div
          className={cn(
            'w-full flex items-center max-w-lg mx-auto py-2 bg-no-repeat bg-cover h-full bg-center aspect-video rounded-sm',
            'relative',
          )}
        >
          <div
            className={cn(
              'absolute aspect-video size-full',
              'rounded-sm',
              'flex justify-center items-center bg-secondary-light/10',
            )}
          >
            <Logo className='opacity-70 size-24 text-3xl' />
          </div>
        </div>
      )}

      {datePublished ? (
        <span className='text-sm text-muted-foreground'>
          {formatDate(datePublished)}
        </span>
      ) : null}

      {roles?.length ? (
        <div className='w-full max-w-prose flex gap-2 items-center max-sm:flex-col'>
          <h2 className='font-medium text-primary-foreground flex-none'>
            My Roles
          </h2>
          <div className='flex flex-wrap gap-1 max-sm:self-start'>
            {roles?.map((r) => (
              <Tag
                key={r?._id}
                className='text-primary-light bg-secondary max-sm:text-xs'
              >
                {r?.name}
              </Tag>
            ))}
          </div>
        </div>
      ) : null}

      {roles?.length ? <Separator className='w-1/2 my-2' /> : null}

      <PortableBlockContent value={production?.description} />

      {video?.url ? (
        <div className='flex flex-col items-center mt-8 sm:mt-2'>
          <p className='text-xs text-muted-foreground'>
            Trouble loading video?
          </p>
          <Button asChild variant='link' className='text-secondary'>
            <a href={video?.url} rel='noreferrer nofollow'>
              <FaRegCirclePlay className={cn('text-5xl')} />
              Watch here
            </a>
          </Button>
        </div>
      ) : null}

      {series ? <Separator className='w-3/4 sm:w-1/2 mt-4 mb-6' /> : null}

      {series ? (
        <div className='flex flex-col items-center gap-2 w-full'>
          <p className='text-center text-sm'>
            This project is part of a series.
          </p>

          <div className='flex flex-col gap-3 border p-4 rounded'>
            {series?.title ? (
              <h5 className='text-secondary font-medium text-lg text-center'>
                {series?.title}
              </h5>
            ) : null}
            {/* <PortableBlockContent value={series?.description} /> */}
            {otherProjects?.length ? (
              <div
                className={cn(
                  'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 grid-flow-row',
                  'gap-x-6 lg:gap-x-10 xl:gap-x-16 gap-y-10',
                  'px-4 sm:px-12',
                )}
              >
                {otherProjects?.map((proj) => {
                  return (
                    <ProjectCard
                      key={proj?._id}
                      project={proj}
                      showDescription={false}
                      showDate={false}
                      className='text-sm'
                    />
                  )
                })}
              </div>
            ) : null}
          </div>
        </div>
      ) : null}
    </div>
  )
}

export default ProductionPost
