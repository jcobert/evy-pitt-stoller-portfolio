import ProjectCard from '../project-card'
import SeriesCard from '../series/series-card'
import { FC } from 'react'

import { cn } from '@/utils/style'

import PortableBlockContent from '@/components/general/portable/portable-block-content'

import { PROJECT_COLLECTION_BY_SLUG_QUERYResult } from '@/sanity/types/generated/types'

type Props = {
  collection: PROJECT_COLLECTION_BY_SLUG_QUERYResult | undefined
}

const CollectionPage: FC<Props> = async ({ collection }) => {
  const { description, projects, series } = collection || {}

  // const coverPhoto = mainImage || projects?.[0]?.mainImage
  // const imageUrl = getSanityImageUrl(coverPhoto)

  return (
    <div className='flex flex-col gap-4 sm:gap-8 items-center'>
      <PortableBlockContent value={description} />

      <div
        className={cn(
          'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 grid-flow-row',
          'gap-x-6 lg:gap-x-10 xl:gap-x-16 gap-y-10',
          'px-4 sm:px-12',
          'mt-6',
        )}
      >
        {projects?.map((proj) => (
          <ProjectCard key={proj?._id} project={proj} />
        ))}
        {series?.map((s) => <SeriesCard key={s?._id} series={s} />)}
      </div>
    </div>
  )
}

export default CollectionPage
