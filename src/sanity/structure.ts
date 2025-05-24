import { DocumentType } from './types/general'
import type { StructureResolver } from 'sanity/structure'

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      // Projects
      S.documentTypeListItem('project' satisfies DocumentType).title(
        'Projects',
      ),
      S.divider(),

      // Blog
      // S.documentTypeListItem('post' satisfies DocumentType).title('Posts'),
      // S.documentTypeListItem('category' satisfies DocumentType).title(
      //   'Categories',
      // ),
      // S.documentTypeListItem('author' satisfies DocumentType).title('Authors'),
      // S.divider(),

      // Rest
      ...S.documentTypeListItems().filter(
        (item) =>
          item.getId() &&
          !(
            ['post', 'category', 'author', 'project'] as DocumentType[]
          ).includes(item.getId() as DocumentType),
      ),
    ])
