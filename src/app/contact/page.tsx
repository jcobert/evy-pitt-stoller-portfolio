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
import { getProfile } from '@/sanity/lib/fetch'

const loadContent = async () => {
  const profile = await getProfile()
  return { profile }
}

export const metadata: Metadata = generatePageMeta({
  title: 'Contact',
  description: "Let's talk! I'd love to hear about opportunities you may have.",
  url: '/contact',
})

type Props = PageParams

const Page: FC<Props> = async () => {
  const { profile } = await loadContent()

  return (
    <Main className='bg-purple text-white'>
      <PageLayout>
        <Heading
          className='text-white'
          descriptionClassName='text-white/75'
          text='Contact Me'
          description="Let's talk! I'd love to hear about opportunities you may have."
        />

        <section className='mt-8 flex flex-col gap-8'>
          <div>
            <h3 className='text-2xl md:text-3xl font-medium'>
              {fullName(profile?.firstName, profile?.lastName)}
            </h3>
            <span className='text-lg text-white/75'>
              {profile?.locations?.join(' | ')}
            </span>
          </div>
          {profile?.contactInfo ? (
            <div className='flex flex-col gap-8 border-2 border-light-purple p-4 pb-6 sm:p-6 sm:pb-12 rounded-sm bg-light-purple/30'>
              <div className='flex flex-col gap-4 w-fit'>
                {/* <h3 className='text-white/75 font-medium text-lg'>
                  Reach Out
                </h3> */}
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

              <div className='h-px bg-gradient-to-r to-white/5 from-white/40 from-70%' />

              <div className='flex flex-col gap-6 sm:w-fit'>
                <h3 className='text-white/75 font-medium text-lg'>
                  Connect with Me
                </h3>
                <ContactLinks
                  links={profile?.contactInfo}
                  exclude={['email', 'phone']}
                  className='gap-12 pl-1 sm:pl-3'
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
