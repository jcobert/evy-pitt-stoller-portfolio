import { ImageUrlBuilder } from 'sanity'

import { urlFor } from '@/sanity/lib/image'
import { VimeoData, VimeoThumbnailSize } from '@/sanity/types/general'
import {
  type PROJECTS_BY_TYPE_QUERYResult,
  PROJECT_BY_SLUG_QUERYResult,
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
    thumbnailImage?: PROJECTS_BY_TYPE_QUERYResult[number]['mainImage']
    youtube?: Parameters<typeof getYoutubeData>['1']
    vimeo?: Parameters<typeof getVimeoData>['1']
  },
): SanityVideo => {
  const { videoUpload, youtube, otherLink } = video || {}

  const customThumbnailUrl = getSanityImageUrl(options?.thumbnailImage, {
    ratio: '16/9',
    width: 600,
  })

  const fileData = videoUpload?.file?.asset
  const youtubeData = getYoutubeData(youtube, options?.youtube)
  const vimeoData = getVimeoData(video?.vimeo as VimeoData, options?.vimeo)

  const url =
    fileData?.url || youtubeData?.url || vimeoData?.url || otherLink || ''

  const thumbnailUrl =
    customThumbnailUrl ||
    youtubeData?.thumbnailUrl ||
    vimeoData?.thumbnailUrl ||
    ''

  const title = fileData?.title || youtubeData?.title || vimeoData?.title || ''

  const description =
    fileData?.description ||
    youtubeData?.description ||
    vimeoData?.description ||
    ''

  return { url: url, thumbnailUrl, title, description }
}

type ImageRatio = '16/9' | '4/3' | 'square' | 'original'

const buildDimensions = (ratio: ImageRatio, width: number = 800) => {
  let rat = 1
  switch (ratio) {
    case '16/9':
      rat = 16 / 9
      break
    case '4/3':
      rat = 4 / 3
      break
    case 'square':
    default:
      rat = 1
      break
  }
  const height = ratio !== 'original' ? Math.floor(width / rat) : null
  return { width, height }
}

export const getSanityImageUrl = (
  image: NonNullable<PROJECT_BY_SLUG_QUERYResult>['mainImage'] | undefined,
  options?: {
    ratio?: ImageRatio
    width?: number
    crop?: Parameters<ImageUrlBuilder['crop']>['0']
  },
) => {
  if (!image?.asset) return ''
  const originalDimensions = image?.asset?.metadata?.dimensions
  const {
    ratio = 'original',
    width = originalDimensions?.width,
    crop = 'entropy',
  } = options || {}
  const hotspot = image?.hotspot

  const size = typeof width === 'number' ? buildDimensions(ratio, width) : null

  let img = urlFor(image)
    .fit('crop')
    .crop(hotspot ? 'focalpoint' : crop)
    .format('webp')

  if (
    size?.width &&
    (ratio !== 'original' || size?.width !== originalDimensions?.width)
  ) {
    img = img.width(size?.width)
  }
  if (size?.height) {
    img = img.height(size.height)
  }
  if (hotspot) {
    img = img.focalPoint(hotspot?.x || 0, hotspot?.y || 0)
  }
  return img.url()
}
