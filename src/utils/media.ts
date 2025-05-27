import { VimeoData, VimeoThumbnailSize } from '@/sanity/types/general'
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

export const getYoutubeData = (
  video: YoutubeVideo | undefined,
  options?: { thumbnail?: YoutubeThumbnailQuality },
) => {
  const { thumbnail = 'high' } = options || {}
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

const findVimeoThumbnail = (
  thumbnails: VimeoData['pictures'],
  size: keyof typeof VimeoThumbnailSize,
) => {
  const { sizes } = thumbnails || {}

  if (!sizes?.length) return {}
  const thumb =
    sizes?.find((s) => s?.height === VimeoThumbnailSize[size]) ||
    sizes?.find((s) => s?.height === VimeoThumbnailSize.sm) ||
    sizes?.find((s) => s?.height === VimeoThumbnailSize.md) ||
    sizes?.find((s) => s?.height === VimeoThumbnailSize.lg) ||
    sizes?.[sizes.length - 1]
  return thumb
}

export const getVimeoData = (
  video: VimeoData | undefined,
  options?: { thumbnail?: keyof typeof VimeoThumbnailSize },
) => {
  const { thumbnail = 'sm' } = options || {}
  const { id, name = '', description = '', link = '', pictures } = video || {}
  const thumbnailUrl = findVimeoThumbnail(pictures, thumbnail)?.link
  return { id, title: name, description, url: link, thumbnailUrl }
}

export const getSanityVideo = (
  video: PROJECTS_BY_TYPE_QUERYResult[number]['mainVideo'] | undefined,
  options?: {
    youtube?: Parameters<typeof getYoutubeData>['1']
    vimeo?: Parameters<typeof getVimeoData>['1']
  },
): SanityVideo => {
  const { videoUpload, youtube } = video || {}

  const vimeo = video?.vimeo as VimeoData

  const fileData = videoUpload?.file?.asset
  const youtubeData = getYoutubeData(youtube, options?.youtube)
  const vimeoData = getVimeoData(vimeo, options?.vimeo)

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
