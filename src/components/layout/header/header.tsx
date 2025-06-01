import DesktopNav from './desktop-nav'
import MobileNav from './mobile-nav'
import Link from 'next/link'
import { FC } from 'react'

import { homeUrl } from '@/utils/nav'

import ContactCta from '@/components/general/contact-cta'
import Logo from '@/components/general/logo'

const Header: FC = () => {
  return (
    <header className='sticky top-0 z-[99] bg-primary/90 backdrop-blur-lg border-b border-b-border shadow-sm h-16 flex'>
      <div className='layout grid grid-cols-12 mx-auto items-center'>
        <Link
          href={homeUrl()}
          className='w-fit max-md:col-start-5 max-md:col-span-4 max-md:mx-auto hover:opacity-90 transition'
        >
          <Logo />
          <span className='sr-only w-0'>Home</span>
        </Link>

        <DesktopNav className='col-start-5 col-span-4 mx-auto max-md:hidden' />

        <MobileNav className='col-start-11 col-span-2 justify-self-end md:hidden pr-2' />

        <ContactCta className='max-md:hidden col-start-11 col-span-2 justify-self-end' />
      </div>
    </header>
  )
}

export default Header
