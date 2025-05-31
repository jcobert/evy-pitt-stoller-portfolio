import {
  AboutPage,
  ContactPage,
  HomePage,
  ProductionPage,
  Profile,
  Project,
  WritingPage,
} from './generated/types'

/** Union of all document type schemas. */
export type DocumentSchema =
  | Project
  | Profile
  | HomePage
  | AboutPage
  | ContactPage
  | ProductionPage
  | WritingPage

/** Union of all document type schema names. */
export type DocumentType = DocumentSchema['_type']

export type PageDocumentType = Extract<
  DocumentSchema,
  HomePage | AboutPage | ContactPage | ProductionPage | WritingPage
>['_type']

export enum VimeoThumbnailSize {
  xl = 1080,
  lg = 720,
  md = 540,
  sm = 360,
  xs = 166,
}

export type VimeoPictures = {
  active?: boolean
  base_link?: string
  default_picture?: boolean
  resource_key?: string
  sizes?: {
    height?: number
    link?: string
    link_with_play_button?: string
    width?: number
    _key?: string
  }[]
  type?: string
  uri?: string
}

export type VimeoData = {
  id?: string
  link?: string
  name?: string
  description?: string
  pictures?: VimeoPictures
}
