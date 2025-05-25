import { PROJECTS_BY_TYPE_QUERYResult } from '@/sanity/types/generated/types'

export const getSanityVideo = (
  video: PROJECTS_BY_TYPE_QUERYResult[number]['mainVideo'] | undefined,
) => {
  const { videoUpload, youtube, vimeo } = video || {}
  const fileAsset = videoUpload?.file?.asset
  const url = fileAsset?.url || youtube || vimeo
  return { ...fileAsset, url: url } satisfies Partial<typeof fileAsset>
}
