import ProjectCard from '../project-card'
import { FC } from 'react'
import { HiOutlineExternalLink } from 'react-icons/hi'

import { formatDate } from '@/utils/date'
import { getSanityImageUrl } from '@/utils/media'
import { cn } from '@/utils/style'

import PortableBlockContent from '@/components/general/portable/portable-block-content'
import Separator from '@/components/general/separator'
import { Button } from '@/components/ui/button'

import {
  PROJECTS_BY_SERIES_QUERYResult,
  PROJECT_BY_SLUG_QUERYResult,
} from '@/sanity/types/generated/types'

type Props = {
  writing: PROJECT_BY_SLUG_QUERYResult | undefined
  seriesProjects: PROJECTS_BY_SERIES_QUERYResult | null | undefined
}

const WritingPost: FC<Props> = ({ writing, seriesProjects }) => {
  const {
    datePublished,
    mainImage,
    description,
    articleLink,
    articlePreview,
    series,
  } = writing || {}

  const image = getSanityImageUrl(mainImage, { ratio: '4/3', width: 800 })

  const otherProjects = seriesProjects?.filter(
    (proj) => proj?._id !== writing?._id,
  )

  return (
    <div
      className={cn(
        'flex flex-col gap-6 sm:gap-8 items-center',
        !datePublished && 'gap-8 sm:gap-10',
      )}
    >
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

      {articlePreview ? (
        <section>
          <div className='prose border bg-accent/50 rounded p-4 fade-out-b max-h-32 overflow-hidden'>
            <p className='fade-out-b max-h-32 overflow-hidden'>
              {articlePreview}
            </p>
          </div>
        </section>
      ) : null}

      {articleLink ? (
        <Button
          asChild
          variant='outline'
          className='flex items-center gap-1 mx-auto'
        >
          <div className='w-fit'>
            <a href={articleLink} rel='noreferrer nofollow'>
              {articlePreview ? 'Keep reading' : 'Read the article'}
            </a>
            <HiOutlineExternalLink aria-label='This is an external link.' />
          </div>
        </Button>
      ) : null}

      {description ? (
        <div
          aria-hidden
          className='h-px w-full bg-gradient-to-r from-accent/10 via-foreground/10 to-accent/10 mt-6'
        />
      ) : null}

      {description ? (
        <section className='flex flex-col gap-6 sm:gap-8 mt-4'>
          <div className='prose'>
            <h2>Background</h2>
            <PortableBlockContent value={description} />
          </div>
          {articleLink ? (
            <Button
              asChild
              variant='link'
              className='flex items-center gap-1 mx-auto'
            >
              <div className='w-fit'>
                <a href={articleLink} rel='noreferrer nofollow'>
                  Read the article
                </a>
                <HiOutlineExternalLink aria-label='This is an external link.' />
              </div>
            </Button>
          ) : null}
        </section>
      ) : null}

      {series ? <Separator className='w-1/2 mt-4 mb-6' /> : null}

      {series ? (
        <div className='flex flex-col items-center gap-2 w-full'>
          <p className='text-center'>This project is part of a series.</p>

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
                    />
                  )
                  // if (proj?.projectType === 'production')
                  //   return (
                  //     <ProductionCard
                  //       key={proj?._id}
                  //       production={proj}
                  //       showDescription={false}
                  //       showDate={false}
                  //     />
                  //   )
                  // if (proj?.projectType === 'writing')
                  //   return <WritingCard key={proj?._id} writing={proj} />
                  // return null
                })}
              </div>
            ) : null}
          </div>
        </div>
      ) : null}
    </div>
  )
}

export default WritingPost
