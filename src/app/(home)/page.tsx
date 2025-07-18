import { homePageMeta } from './(data)/meta'
import { homePageJsonLd } from './(data)/structured'
import { Metadata } from 'next'
import { FC } from 'react'

import { cn } from '@/utils/style'

import BrandsList from '@/components/brands-list'
import HereoSection from '@/components/features/home/hero-section'
import ProductionsSection from '@/components/features/home/productions-section'
import WritingSection from '@/components/features/home/writing-section'
import Ticker from '@/components/general/ticker'
import Main from '@/components/layout/main'
import PageLayout from '@/components/layout/page-layout'

import {
  getAllProjectCollections,
  getPage,
  getProfile,
  getProjects,
} from '@/sanity/lib/fetch'

const loadContent = async () => {
  const [
    homePage,
    profile,
    projects,
    productionPage,
    writingPage,
    collections,
  ] = await Promise.all([
    getPage('homePage'),
    getProfile(),
    getProjects(),
    getPage('productionPage'),
    getPage('writingPage'),
    getAllProjectCollections(),
  ])

  const productions = projects?.filter(
    (p) => p?.projectType === 'production' && p?.featured,
  )
  const writing = projects?.filter(
    (p) => p?.projectType === 'writing' && p?.featured,
  )

  return {
    profile,
    productions,
    writing,
    homePage,
    productionPage,
    writingPage,
    collections,
  }
}

export const generateMetadata = async (): Promise<Metadata> => {
  const homePage = await getPage('homePage')
  return homePageMeta(homePage)
}

const Page: FC = async () => {
  const {
    homePage,
    profile,
    productions,
    writing,
    productionPage,
    writingPage,
    collections,
  } = await loadContent()

  const { welcomeBlurb } = homePage || {}

  const jsonLd = await homePageJsonLd(homePage)

  const brandRowCutoff = (profile?.companies?.length || 0) / 2

  return (
    <Main className='bg-gradient-to-br from-primary/90 from-20% to-primary pb-0'>
      <PageLayout
        wrapperClassName='max-sm:w-full'
        className={cn(
          'max-md:px-0',
          // 'xl:flex'
        )}
      >
        <HereoSection
          profile={profile}
          welcomeBlurb={welcomeBlurb}
          collections={collections}
        />

        {/* <ProductionsSection
          productions={productions}
          heading={productionPage?.heading}
          className='max-xl:hidden'
        /> */}
      </PageLayout>

      {profile?.companies?.length ? (
        <div
          className={cn(
            'py-4 flex flex-col gap-2',
            'pointer-events-none',
            'bg-primary-light',
            'fade-out-x',
            'border-y-3 border-secondary-light/80',
          )}
        >
          <Ticker duration={18}>
            <BrandsList
              brands={profile?.companies?.slice(0, brandRowCutoff)}
              className='grid-rows-1 !gap-0 -mr-10'
            />
          </Ticker>
          <Ticker duration={22}>
            <BrandsList
              brands={profile?.companies?.slice(brandRowCutoff)}
              className='grid-rows-1 !gap-0 -mr-10'
            />
          </Ticker>
        </div>
      ) : null}

      <ProductionsSection
        productions={productions}
        heading={productionPage?.heading}
        // className='xl:hidden'
      />
      <WritingSection writing={writing} heading={writingPage?.heading} />

      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </Main>
  )
}

export default Page
