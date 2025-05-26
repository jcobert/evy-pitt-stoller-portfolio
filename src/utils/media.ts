import {
  type PROJECTS_BY_TYPE_QUERYResult,
  type YoutubeVideo,
} from '@/sanity/types/generated/types'

const YOUTUBE_VIDEO_URL = 'https://www.youtube.com/watch'
const YOUTUBE_THUMBNAIL_URL = 'https://img.youtube.com/vi'

export enum YoutubeThumbnail {
  default = 'default',
  high = 'hqdefault',
  medium = 'mqdefault',
  standard = 'sddefault',
  maxres = 'maxresdefault',
}

export type YoutubeThumbnailQuality = keyof typeof YoutubeThumbnail

export type SanityVideo = {
  url?: string
  thumbnailUrl?: string
  title?: string
  description?: string
}

const findYoutubeThumbnail = (
  thumbnails: YoutubeVideo['thumbnails'],
  quality: YoutubeThumbnailQuality,
) => {
  const thumb = ((thumbnails || [])?.find((t) => t === quality) ||
    thumbnails?.find((t) => t === 'default') ||
    thumbnails?.find((t) => t === 'high') ||
    thumbnails?.find((t) => t === 'medium') ||
    thumbnails?.find((t) => t === 'standard') ||
    thumbnails?.find((t) => t === 'maxres')) as keyof typeof YoutubeThumbnail

  return YoutubeThumbnail?.[thumb] || ''
}

export const getYoutubeVideo = (
  video: YoutubeVideo | undefined,
  options?: { thumbnail?: YoutubeThumbnailQuality },
) => {
  const { thumbnail = 'default' } = options || {}
  const {
    id,
    title = '',
    description = '',
    publishedAt,
    thumbnails = [],
  } = video || {}

  if (!id) return {}

  const thumbQuality = findYoutubeThumbnail(thumbnails, thumbnail)

  const url = `${YOUTUBE_VIDEO_URL}?v=${id}`
  const thumbnailUrl = `${YOUTUBE_THUMBNAIL_URL}/${id}/${thumbQuality}.jpg`

  return { id, title, description, publishedAt, url, thumbnailUrl }
}

export const getSanityVideo = (
  video: PROJECTS_BY_TYPE_QUERYResult[number]['mainVideo'] | undefined,
  options?: Parameters<typeof getYoutubeVideo>['1'],
): SanityVideo => {
  const { videoUpload, youtube, vimeo } = video || {}

  const fileData = videoUpload?.file?.asset
  const youtubeData = getYoutubeVideo(youtube, options)
  /** @todo update when viemo api integrated. */
  const vimeoData = { url: vimeo, thumbnailUrl: '', title: '', description: '' }

  const url = fileData?.url || youtubeData?.url || vimeoData?.url || ''
  const thumbnailUrl =
    youtubeData?.thumbnailUrl || vimeoData?.thumbnailUrl || ''
  const title = fileData?.title || youtubeData?.title || vimeoData?.title || ''
  const description =
    fileData?.description ||
    youtubeData?.description ||
    vimeoData?.description ||
    ''

  return { url: url, thumbnailUrl, title, description }
}
