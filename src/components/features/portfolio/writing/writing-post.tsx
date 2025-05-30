import { FC } from 'react'
import { HiOutlineExternalLink } from 'react-icons/hi'

import { formatDate } from '@/utils/date'
import { getSanityImageUrl } from '@/utils/media'
import { cn } from '@/utils/style'

import PortableBlockContent from '@/components/general/portable/portable-block-content'
import { Button } from '@/components/ui/button'

import { PROJECT_BY_SLUG_QUERYResult } from '@/sanity/types/generated/types'

type Props = {
  writing: PROJECT_BY_SLUG_QUERYResult | undefined
}

const WritingPost: FC<Props> = ({ writing }) => {
  const { datePublished, mainImage, description, articleLink, articlePreview } =
    writing || {}

  const image = getSanityImageUrl(mainImage, { ratio: '4/3', width: 800 })

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
    </div>
  )
}

export default WritingPost
