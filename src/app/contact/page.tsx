import { Metadata } from 'next'
import { FC } from 'react'

import ContactLinks, {
  ContactIcon,
  getContactLinksArray,
} from '@/components/general/contact-links'
import Heading from '@/components/layout/heading'
import Main from '@/components/layout/main'
import PageLayout from '@/components/layout/page-layout'

import { PageParams } from '@/types/general'

import { generatePageMeta } from '@/configuration/seo'
import { getProfile } from '@/sanity/lib/fetch'

const loadContent = async () => {
  const profile = await getProfile()
  return { profile }
}

export const metadata: Metadata = generatePageMeta({
  title: 'Contact',
  description:
    "Let's talk! Please feel free to contact me with any questions or opportunities",
  url: '/contact',
})

type Props = PageParams

const Page: FC<Props> = async () => {
  const { profile } = await loadContent()

  return (
    <Main className='bg-purple'>
      <PageLayout>
        <Heading
          className='text-white'
          descriptionClassName='text-pale-yellow'
          text='Contact Me'
          description="Let's talk! Please feel free to contact me with any questions or opportunities"
        />

        <section className='mt-8'>
          {profile?.contactInfo ? (
            <div className='flex flex-col gap-8 border-2 border-light-purple p-4 pb-6 sm:p-6 sm:pb-12 rounded-sm bg-light-purple/30'>
              <div className='flex flex-col gap-4 w-fit'>
                <h3 className='text-pale-yellow font-medium text-lg'>
                  Reach Out
                </h3>
                <div className='flex flex-col gap-12 sm:pl-2'>
                  {getContactLinksArray(profile?.contactInfo, {
                    include: ['email', 'phone'],
                  })?.map(([name, { url, text }]) => (
                    <a
                      key={name}
                      href={url}
                      className='hover:opacity-90 transition flex items-center gap-x-4 sm:gap-x-6 gap-y-3 text-white text-lg flex-wrap break-all'
                    >
                      <ContactIcon
                        name={name}
                        className='bg-transparent'
                        iconClassName='text-2xl sm:text-3xl md:text-4xl'
                      />
                      {text}
                    </a>
                  ))}
                </div>
              </div>

              <div className='h-px sm:w-2/3__ bg-gradient-to-r to-white/5 from-white/40 from-70%' />

              <div className='flex flex-col gap-6 sm:w-fit'>
                <h3 className='text-pale-yellow font-medium text-lg'>
                  Connect with Me
                </h3>
                <ContactLinks
                  links={profile?.contactInfo}
                  exclude={['email', 'phone']}
                  className='gap-12 sm:pl-3'
                  iconProps={{
                    className: 'bg-white',
                    iconClassName: 'text-purple',
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
