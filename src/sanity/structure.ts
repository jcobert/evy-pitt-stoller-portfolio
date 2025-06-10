import { DocumentType } from './types/general'
import type { StructureResolver } from 'sanity/structure'

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      // General
      S.divider({ id: 'general', type: 'divider', title: 'General' }),
      S.documentTypeListItem('profile' satisfies DocumentType).child(
        S.document()
          .schemaType('profile' satisfies DocumentType)
          .documentId('profile')
          .title('Profile'),
      ),

      // Portfolio
      S.divider({ id: 'portfolio', type: 'divider', title: 'Portfolio' }),
      S.documentTypeListItem('project' satisfies DocumentType).title(
        'All Projects',
      ),
      S.documentTypeListItem('projectCollection' satisfies DocumentType).title(
        'Collections',
      ),
      // S.documentTypeListItem('projectSeries' satisfies DocumentType).title(
      //   'Series',
      // ),
      S.documentTypeListItem('projectCategory' satisfies DocumentType).title(
        'Categories',
      ),
      S.documentTypeListItem('projectRole' satisfies DocumentType).title(
        'Your Roles',
      ),

      // Pages
      S.divider({ id: 'pages', type: 'divider', title: 'Pages' }),
      S.documentTypeListItem('homePage' satisfies DocumentType).child(
        S.document()
          .schemaType('homePage' satisfies DocumentType)
          .documentId('homePage')
          .title('Home Page'),
      ),
      S.documentTypeListItem('aboutPage' satisfies DocumentType).child(
        S.document()
          .schemaType('aboutPage' satisfies DocumentType)
          .documentId('aboutPage')
          .title('About Page'),
      ),
      S.documentTypeListItem('contactPage' satisfies DocumentType).child(
        S.document()
          .schemaType('contactPage' satisfies DocumentType)
          .documentId('contactPage')
          .title('Contact Page'),
      ),
      S.documentTypeListItem('portfolioPage' satisfies DocumentType).child(
        S.document()
          .schemaType('portfolioPage' satisfies DocumentType)
          .documentId('portfolioPage')
          .title('Portfolio Page'),
      ),
      S.documentTypeListItem('productionPage' satisfies DocumentType).child(
        S.document()
          .schemaType('productionPage' satisfies DocumentType)
          .documentId('productionPage')
          .title('Production Page'),
      ),
      S.documentTypeListItem('writingPage' satisfies DocumentType).child(
        S.document()
          .schemaType('writingPage' satisfies DocumentType)
          .documentId('writingPage')
          .title('Writing Page'),
      ),

      // Rest
      S.divider(),
      ...S.documentTypeListItems().filter(
        (item) =>
          item.getId() &&
          !(
            [
              'project',
              'projectCollection',
              'projectSeries',
              'projectCategory',
              'projectRole',
              'profile',
              'homePage',
              'aboutPage',
              'contactPage',
              'portfolioPage',
              'productionPage',
              'writingPage',
            ] as DocumentType[]
          ).includes(item.getId() as DocumentType),
      ),
    ])
