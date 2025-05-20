import { NavItem } from '@/utils/nav'

export const NAVIGATION_ITEMS: NavItem[] = [
  {
    id: 'about',
    name: 'About',
    url: '/about',
  },
  {
    id: 'works',
    name: 'Works',
    url: '/works',
    menu: {
      links: [
        {
          id: 'works.production',
          name: 'production',
          url: '/works/production',
        },
        {
          id: 'works.writing',
          name: 'writing',
          url: '/works/writing',
        },
      ],
    },
  },
  {
    id: 'contact',
    name: 'Contact',
    url: '/contact',
  },
]
