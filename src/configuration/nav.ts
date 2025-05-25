import { NavItem } from '@/utils/nav'

export const NAVIGATION_ITEMS: NavItem[] = [
  {
    id: 'home',
    name: 'Home',
    url: '/',
  },
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
          name: 'Production',
          url: '/works/production',
        },
        {
          id: 'works.writing',
          name: 'Writing',
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
