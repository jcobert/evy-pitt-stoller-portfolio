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
    id: 'portfolio',
    name: 'Portfolio',
    url: '/portfolio',
    menu: {
      links: [
        {
          id: 'portfolio.production',
          name: 'Production',
          url: '/portfolio/production',
        },
        {
          id: 'portfolio.writing',
          name: 'Writing',
          url: '/portfolio/writing',
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
