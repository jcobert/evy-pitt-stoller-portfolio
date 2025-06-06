import { writingPageMeta } from './(data)/meta'
import { writingPageJsonLd } from './(data)/structured'
import { Metadata } from 'next'
import { FC } from 'react'

import WritingCard from '@/components/features/portfolio/writing/writing-card'
import AnimateOnScroll from '@/components/general/animate-on-scroll'
import NoResults from '@/components/general/no-results'
import Heading from '@/components/layout/heading'
import Main from '@/components/layout/main'
import PageLayout from '@/components/layout/page-layout'

import { PageParams } from '@/types/general'

import { getPage, getProjects } from '@/sanity/lib/fetch'

const loadContent = async () => {
  const [writingPage, projects] = await Promise.all([
    getPage('writingPage'),
    getProjects({ projectType: 'writing' }),
  ])
  return { writingPage, projects }
}

export type WritingPageData = Awaited<ReturnType<typeof loadContent>>

export const generateMetadata = async (): Promise<Metadata> => {
  const data = await loadContent()
  return writingPageMeta(data)
}

type Props = PageParams

const Page: FC<Props> = async () => {
  const data = await loadContent()
  const { projects, writingPage } = data
  const { heading } = writingPage || {}

  const mainHeading = heading?.mainHeading || 'Writing'
  const subheading = heading?.subheading || "Look, mom, I'm a published writer!"

  const jsonLd = await writingPageJsonLd(data)

  return (
    <Main>
      <PageLayout>
        <Heading text={mainHeading} description={subheading} />
        <section className='my-4'>
          {!projects?.length ? (
            <NoResults item='writing' />
          ) : (
            <div className='grid grid-cols-1 lg:grid-cols-2 grid-flow-row gap-x-6 gap-y-10 lg:gap-x-12'>
              {projects?.map((proj) => (
                <AnimateOnScroll
                  key={proj?._id}
                  animations={['slideInFromBottom', 'fadeIn']}
                  className='duration-500'
                  threshold={0.1}
                >
                  <WritingCard writing={proj} />
                </AnimateOnScroll>
              ))}
            </div>
          )}
        </section>
      </PageLayout>

      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </Main>
  )
}

export default Page
