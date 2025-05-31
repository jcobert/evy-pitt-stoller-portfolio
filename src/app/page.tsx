import { Metadata } from 'next'
import { FC } from 'react'

import HereoSection from '@/components/features/home/hero-section'
import ProductionsSection from '@/components/features/home/productions-section'
import WritingSection from '@/components/features/home/writing-section'
import Main from '@/components/layout/main'
import PageLayout from '@/components/layout/page-layout'

import { generatePageMeta } from '@/configuration/seo'
import { getPage, getProfile, getProjects } from '@/sanity/lib/fetch'

const loadContent = async () => {
  const [homePage, profile, projects, productionPage, writingPage] =
    await Promise.all([
      getPage('homePage'),
      getProfile(),
      getProjects(),
      getPage('productionPage'),
      getPage('writingPage'),
    ])

  const productions = projects?.filter((p) => p?.projectType === 'production')
  const writing = projects?.filter((p) => p?.projectType === 'writing')

  return {
    profile,
    productions,
    writing,
    homePage,
    productionPage,
    writingPage,
  }
}

export const generateMetadata = async (): Promise<Metadata> => {
  return generatePageMeta({
    title: 'Home',
    description: '',
    url: '/',
  })
}

const Page: FC = async () => {
  const {
    homePage,
    profile,
    productions,
    writing,
    productionPage,
    writingPage,
  } = await loadContent()

  const { welcomeBlurb } = homePage || {}

  return (
    <Main className='bg-gradient-to-br from-light-green/90 from-20% to-dark-green/15 pb-0'>
      <PageLayout wrapperClassName='max-sm:w-full' className='max-md:px-0'>
        <HereoSection profile={profile} welcomeBlurb={welcomeBlurb} />
      </PageLayout>
      <ProductionsSection
        productions={productions}
        heading={productionPage?.heading}
      />
      <WritingSection writing={writing} heading={writingPage?.heading} />
    </Main>
  )
}

export default Page
