import { Author, Category, Post, Project } from './generated/types'

/** Union of all document type schemas. */
export type DocumentSchema = Project | Author | Post | Category

/** Union of all document type schema names. */
export type DocumentType = DocumentSchema['_type']
