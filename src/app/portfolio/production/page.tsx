import { productionPageMeta } from './(data)/meta'
import { productionPageJsonLd } from './(data)/structured'
import { Metadata } from 'next'
import { FC } from 'react'

import ProductionCard from '@/components/features/portfolio/production/production-card'
import AnimateOnScroll from '@/components/general/animate-on-scroll'
import NoResults from '@/components/general/no-results'
import Heading from '@/components/layout/heading'
import Main from '@/components/layout/main'
import PageLayout from '@/components/layout/page-layout'

import { PageParams } from '@/types/general'

import { getPage, getProjects } from '@/sanity/lib/fetch'

const loadContent = async () => {
  const [productionPage, projects] = await Promise.all([
    getPage('productionPage'),
    getProjects({ projectType: 'production' }),
  ])
  return { productionPage, projects }
}

export type ProductionPageData = Awaited<ReturnType<typeof loadContent>>

export const generateMetadata = async (): Promise<Metadata> => {
  const data = await loadContent()
  return productionPageMeta(data)
}

type Props = PageParams

const Page: FC<Props> = async () => {
  const data = await loadContent()
  const { projects, productionPage } = data
  const { heading } = productionPage || {}

  const mainHeading = heading?.mainHeading || 'Production'
  const subheading = heading?.subheading

  const jsonLd = await productionPageJsonLd(data)

  return (
    <Main>
      <PageLayout>
        <Heading text={mainHeading} description={subheading} />
        <section className='my-4'>
          {!projects?.length ? (
            <NoResults item='productions' />
          ) : (
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 grid-flow-row gap-x-6 gap-y-10'>
              {projects?.map((proj, i) => (
                <AnimateOnScroll
                  key={proj?._id}
                  animations={['slideInFromBottom', 'fadeIn']}
                  className='duration-500'
                  threshold={0.1}
                >
                  <ProductionCard production={proj} />
                  {i < projects.length - 1 ? (
                    <div
                      aria-hidden
                      className='sm:hidden h-px bg-gradient-to-r from-accent/10 via-primary-foreground/10 to-accent/10 mt-6'
                    />
                  ) : null}
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
