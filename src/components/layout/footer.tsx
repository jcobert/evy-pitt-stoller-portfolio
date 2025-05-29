import ContactLinks from '../general/contact-links'
import { FC } from 'react'

import { siteConfig } from '@/configuration/site'
import { getProfile } from '@/sanity/lib/fetch'

const Footer: FC = async () => {
  const { contactInfo } = (await getProfile()) || {}

  const copy = `${new Date().getFullYear()} ${siteConfig.title}`

  return (
    <footer className='bg-accent border-t-2 pb-safe'>
      <div className='layout py-4'>
        <div className='flex max-sm:flex-col-reverse gap-y-6 items-center justify-between'>
          <span className='text-xs text-center text-foreground/85'>
            &copy; {copy}
          </span>

          <ContactLinks
            links={contactInfo}
            iconProps={{
              className: 'bg-transparent',
              iconClassName: 'text-light-purple',
            }}
          />
        </div>
      </div>
    </footer>
  )
}

export default Footer
