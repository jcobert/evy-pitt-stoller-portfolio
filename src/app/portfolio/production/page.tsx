import { productionPageMeta } from './(data)/meta'
import { productionPageJsonLd } from './(data)/structured'
import { Metadata } from 'next'
import { FC } from 'react'

import { cn } from '@/utils/style'

import AnimateOnScroll from '@/components/animation/animate-on-scroll'
import CollectionCard from '@/components/features/portfolio/collection/collection-card'
import ProductionCard from '@/components/features/portfolio/production/production-card'
import NoResults from '@/components/general/no-results'
import Separator from '@/components/general/separator'
import Heading from '@/components/layout/heading'
import Main from '@/components/layout/main'
import PageLayout from '@/components/layout/page-layout'

import { PageParams } from '@/types/general'

import {
  getAllProjectCollections,
  getPage,
  getProjects,
} from '@/sanity/lib/fetch'

const loadContent = async () => {
  const [productionPage, projects, collections] = await Promise.all([
    getPage('productionPage'),
    getProjects({ projectType: 'production' }),
    getAllProjectCollections(),
  ])
  return { productionPage, projects, collections }
}

export type ProductionPageData = Awaited<ReturnType<typeof loadContent>>

export const generateMetadata = async (): Promise<Metadata> => {
  const data = await loadContent()
  return productionPageMeta(data)
}

type Props = PageParams

const Page: FC<Props> = async () => {
  const data = await loadContent()
  const { projects, productionPage, collections } = data
  const { heading } = productionPage || {}

  const mainHeading = heading?.mainHeading || 'Production'
  const subheading = heading?.subheading

  const jsonLd = await productionPageJsonLd(data)

  return (
    <Main>
      <PageLayout>
        <Heading text={mainHeading} description={subheading} />

        <div className='my-4'>
          {!projects?.length ? (
            <NoResults item='productions' />
          ) : (
            <div className='flex flex-col gap-16'>
              {/* <ProjectsToolbar /> */}

              <section className={cn('flex flex-col gap-4')}>
                <h2 className='font-display text-2xl sm:text-3xl font-medium text-primary-foreground'>
                  Collections
                </h2>
                <div className={cn('bg-accent border rounded', 'p-8')}>
                  <div
                    className={cn(
                      'grid grid-flow-row grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-10',
                    )}
                  >
                    {collections?.map((col) => (
                      <CollectionCard key={col?._id} collection={col} />
                    ))}
                  </div>
                </div>
              </section>

              <Separator />

              <section className='flex flex-col gap-6'>
                <h2 className='font-display text-2xl sm:text-3xl font-medium text-primary-foreground'>
                  All Projects
                </h2>
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
              </section>
            </div>
          )}
        </div>
      </PageLayout>

      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </Main>
  )
}

export default Page
