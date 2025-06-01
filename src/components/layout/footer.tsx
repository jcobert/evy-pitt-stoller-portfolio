import ContactCta from '../general/contact-cta'
import ContactLinks from '../general/contact-links'
import { FC } from 'react'

import { siteConfig } from '@/configuration/site'
import { getProfile } from '@/sanity/lib/fetch'

const Footer: FC = async () => {
  const { contactInfo } = (await getProfile()) || {}

  const copy = `${new Date().getFullYear()} ${siteConfig.title}`

  return (
    <footer className='bg-accent border-t-2 pb-safe print:hidden'>
      <div className='layout py-6 sm:py-4'>
        <div className='flex max-sm:flex-col-reverse gap-y-6 items-center justify-between'>
          <span className='text-xs text-center text-foreground/85'>
            &copy; {copy}
          </span>

          <div className='flex max-sm:flex-col gap-6 items-center flex-wrap'>
            <ContactLinks
              links={contactInfo}
              iconProps={{
                className: 'bg-transparent',
                iconClassName: 'text-light-purple',
              }}
            />
            <ContactCta className='md:hidden max-sm:px-12 max-sm:py-5' />
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
