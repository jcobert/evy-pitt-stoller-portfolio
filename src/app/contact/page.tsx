import { Metadata } from 'next'
import { FC } from 'react'

import { fullName } from '@/utils/string'

import ContactLinks, {
  ContactIcon,
  getContactLinksArray,
} from '@/components/general/contact-links'
import Heading from '@/components/layout/heading'
import Main from '@/components/layout/main'
import PageLayout from '@/components/layout/page-layout'

import { PageParams } from '@/types/general'

import { generatePageMeta } from '@/configuration/seo'
import { getPage, getProfile } from '@/sanity/lib/fetch'

const loadContent = async () => {
  const [contactPage, profile] = await Promise.all([
    getPage('contactPage'),
    getProfile(),
  ])

  return { profile, contactPage }
}

export const metadata: Metadata = generatePageMeta({
  title: 'Contact',
  description: "Let's talk! I'd love to hear about opportunities you may have.",
  url: '/contact',
})

type Props = PageParams

const Page: FC<Props> = async () => {
  const { profile, contactPage } = await loadContent()
  const { heading } = contactPage || {}

  const mainHeading = heading?.mainHeading || 'Contact Me'
  const subheading =
    heading?.subheading ||
    "Let's talk! I'd love to hear about opportunities you may have."

  return (
    <Main className='bg-pale-purple/80 text-purple'>
      <PageLayout>
        <Heading text={mainHeading} description={subheading} />

        <section className='mt-8 flex flex-col gap-4 md:gap-8 border-2 border-purple/20 p-4 pb-6 sm:p-6 sm:pb-12 rounded-sm bg-white/90'>
          <div>
            <h3 className='text-2xl md:text-3xl font-medium'>
              {fullName(profile?.firstName, profile?.lastName)}
            </h3>
            {/* <span className='text-lg text-muted-foreground'>
              {profile?.locations?.join(' | ')}
            </span> */}
          </div>
          {profile?.contactInfo ? (
            <div className='flex flex-col gap-4 md:gap-8'>
              <div className='flex flex-col gap-4 w-fit'>
                {/* <h3 className='text-white/75 font-medium text-lg'>
                  Reach Out
                </h3> */}
                <div className='flex max-lg:flex-col flex-wrap gap-8 gap-x-12 sm:pl-2'>
                  {getContactLinksArray(profile?.contactInfo, {
                    include: ['email', 'phone'],
                  })?.map(([name, { url, text }]) => (
                    <a
                      key={name}
                      href={url}
                      className='hover:opacity-90 transition flex items-center gap-x-4 sm:gap-x-6 lg:gap-x-4 gap-y-3 text-foreground sm:text-lg flex-wrap break-all'
                    >
                      <ContactIcon
                        name={name}
                        className='bg-transparent'
                        iconClassName='text-2xl sm:text-3xl md:text-4xl text-purple'
                      />
                      {text}
                    </a>
                  ))}
                </div>
              </div>

              <div
                aria-hidden
                className='h-px bg-gradient-to-r to-pale-purple/5 from-light-purple/40 from-60% max-md:my-2'
              />

              <div className='flex flex-col gap-6 sm:w-fit'>
                <h3 className='text-muted-foreground font-medium text-lg'>
                  Connect with Me
                </h3>
                <ContactLinks
                  links={profile?.contactInfo}
                  exclude={['email', 'phone']}
                  className='gap-10 pl-1 sm:pl-4'
                  iconProps={{
                    // className: 'bg-white',
                    iconClassName: 'text-lg md:text-xl',
                  }}
                />
              </div>
            </div>
          ) : null}
        </section>
      </PageLayout>
    </Main>
  )
}

export default Page
