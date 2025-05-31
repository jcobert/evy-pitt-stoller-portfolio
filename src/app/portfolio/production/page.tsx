import { Metadata } from 'next'
import { FC } from 'react'

import ProductionCard from '@/components/features/portfolio/production/production-card'
import NoResults from '@/components/general/no-results'
import Heading from '@/components/layout/heading'
import Main from '@/components/layout/main'
import PageLayout from '@/components/layout/page-layout'

import { PageParams } from '@/types/general'

import { generatePageMeta } from '@/configuration/seo'
import { getPage, getProjects } from '@/sanity/lib/fetch'

const loadContent = async () => {
  const [productionPage, projects] = await Promise.all([
    getPage('productionPage'),
    getProjects({ projectType: 'production' }),
  ])

  return { productionPage, projects }
}

export const metadata: Metadata = generatePageMeta({
  title: 'Production',
  description: "A collection of media projects that I've worked on.",
  url: '/portfolio/production',
})

type Props = PageParams

const Page: FC<Props> = async () => {
  const { projects, productionPage } = await loadContent()
  const { heading } = productionPage || {}

  const mainHeading = heading?.mainHeading || 'Production'
  const subheading =
    heading?.subheading ||
    "Check out some of the awesome projects I've worked on!"

  return (
    <Main className='bg-background'>
      <PageLayout>
        <Heading text={mainHeading} description={subheading} />
        <section className='my-4'>
          {!projects?.length ? (
            <NoResults item='productions' />
          ) : (
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 grid-flow-row gap-x-6 gap-y-10'>
              {projects?.map((proj, i) => (
                <div key={proj?._id}>
                  <ProductionCard production={proj} />
                  {i < projects.length - 1 ? (
                    <div
                      aria-hidden
                      className='sm:hidden h-px bg-gradient-to-r from-accent/10 via-foreground/10 to-accent/10 mt-6'
                    />
                  ) : null}
                </div>
              ))}
            </div>
          )}
        </section>
      </PageLayout>
    </Main>
  )
}

export default Page
