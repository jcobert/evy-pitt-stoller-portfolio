import { PortableTextComponentProps } from '@portabletext/react'

import VideoPlayer from '@/components/media/video-player'

import { SanityFileAsset } from '@/sanity/types/generated/types'

type VideoEmbed = {
  _type: 'videoEmbed'
  file: { _type: string; asset: SanityFileAsset }
  alt?: string
}

export const PortableVideo = ({
  value,
}: PortableTextComponentProps<{ _key: string } & VideoEmbed>) => {
  const { url } = value?.file?.asset || {}

  if (!url) return null
  return (
    <div className='max-h-[75dvh]'>
      <VideoPlayer video={value?.file?.asset} />
    </div>
  )
}
