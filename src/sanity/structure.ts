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

      // S.listItem()
      //   .title('Profile')
      //   .id('profile')
      //   .child(
      //     S.document()
      //       .schemaType('profile' satisfies DocumentType)
      //       .documentId('profile'),
      //   ),
      S.documentTypeListItem('profile' satisfies DocumentType).child(
        S.document()
          .schemaType('profile' satisfies DocumentType)
          .documentId('profile')
          .title('Profile'),
      ),
      S.divider(),

      // Rest
      ...S.documentTypeListItems().filter(
        (item) =>
          item.getId() &&
          !(
            [
              'post',
              'category',
              'author',
              'project',
              'profile',
            ] as DocumentType[]
          ).includes(item.getId() as DocumentType),
      ),
    ])
