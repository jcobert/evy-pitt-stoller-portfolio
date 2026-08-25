'use client'

import CollectionCard from '../portfolio/collection/collection-card'
import Autoplay from 'embla-carousel-autoplay'
import { FC, useRef } from 'react'

import { cn } from '@/utils/style'

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'

import { PROJECT_COLLECTIONS_QUERY_RESULT } from '@/sanity/types/generated/types'

type Props = {
  collections: PROJECT_COLLECTIONS_QUERY_RESULT | undefined | null
  className?: string
}

const ProjectCarousel: FC<Props> = ({ collections, className }) => {
  if (!collections?.length) return null

  return (
    <Carousel
      className={cn('px-4 py-1 mx-auto', className)}
      orientation='horizontal'
      opts={{ loop: true, align: 'center' }}
      autoplay
    >
      <CarouselPrevious />
      <CarouselContent className='px-12'>
        {collections?.map((col) => (
          <CarouselItem key={col?._id} className={cn('ml-4 p-px')}>
            <CollectionCard collection={col} animate={false} />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselNext />
    </Carousel>
  )
}

export default ProjectCarousel
