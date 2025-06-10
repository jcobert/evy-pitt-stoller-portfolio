import { FC } from 'react'

import { getSanityImageUrl, getSanityVideo } from '@/utils/media'
import { cn } from '@/utils/style'

import { PROJECT_COLLECTION_BY_SLUG_QUERYResult } from '@/sanity/types/generated/types'
import { Dialog } from '@/components/ui/dialog'

type Props = {
  series:
    | NonNullable<
        NonNullable<PROJECT_COLLECTION_BY_SLUG_QUERYResult>['series']
      >[number]
    | undefined
  className?: string
}

const SeriesModal: FC<Props> = ({ series }) => {
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

  return <Dialog></Dialog>
}

export default SeriesModal
