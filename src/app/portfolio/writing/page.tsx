import { Metadata } from 'next'
import { FC } from 'react'

import WritingCard from '@/components/features/portfolio/writing/writing-card'
import NoResults from '@/components/general/no-results'
import Heading from '@/components/layout/heading'
import Main from '@/components/layout/main'
import PageLayout from '@/components/layout/page-layout'

import { PageParams } from '@/types/general'

import { generatePageMeta } from '@/configuration/seo'
import { getPage, getProjects } from '@/sanity/lib/fetch'

const loadContent = async () => {
  const [writingPage, projects] = await Promise.all([
    getPage('writingPage'),
    getProjects({ projectType: 'writing' }),
  ])

  return { writingPage, projects }
}

export const generateMetadata = async (): Promise<Metadata> => {
  const { writingPage } = await loadContent()
  const { heading, seo } = writingPage || {}

  const title = heading?.mainHeading

  return generatePageMeta({
    title,
    description: seo?.description,
    url: '/portfolio/writing',
  })
}

type Props = PageParams

const Page: FC<Props> = async () => {
  const { projects, writingPage } = await loadContent()
  const { heading } = writingPage || {}

  const mainHeading = heading?.mainHeading || 'Writing'
  const subheading = heading?.subheading || "Look, mom, I'm a published writer!"

  return (
    <Main className='bg-background'>
      <PageLayout>
        <Heading text={mainHeading} description={subheading} />
        <section className='my-4'>
          {!projects?.length ? (
            <NoResults item='writing' />
          ) : (
            <div className='grid grid-cols-1 lg:grid-cols-2 grid-flow-row gap-x-6 gap-y-10 lg:gap-x-12'>
              {projects?.map((proj) => (
                <WritingCard key={proj?._id} writing={proj} />
              ))}
            </div>
          )}
        </section>
      </PageLayout>
    </Main>
  )
}

export default Page
