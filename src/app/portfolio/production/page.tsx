import { productionPageMeta } from './(data)/meta'
import { productionPageJsonLd } from './(data)/structured'
import { Metadata } from 'next'
import { FC } from 'react'

import { cn } from '@/utils/style'

import CollectionCard from '@/components/features/portfolio/collection/collection-card'
import NoResults from '@/components/general/no-results'
import Heading from '@/components/layout/heading'
import Main from '@/components/layout/main'
import PageLayout from '@/components/layout/page-layout'

import { PageParams } from '@/types/general'

import { getAllProjectCollections, getPage } from '@/sanity/lib/fetch'

const loadContent = async () => {
  const [productionPage, collections] = await Promise.all([
    getPage('productionPage'),
    getAllProjectCollections(),
  ])
  return { productionPage, collections }
}

export type ProductionPageData = Awaited<ReturnType<typeof loadContent>>

export const generateMetadata = async (): Promise<Metadata> => {
  const data = await loadContent()
  return productionPageMeta(data)
}

type Props = PageParams

const Page: FC<Props> = async () => {
  const data = await loadContent()
  const { productionPage, collections } = data
  const { heading } = productionPage || {}

  const mainHeading = heading?.mainHeading || 'Production'
  const subheading = heading?.subheading

  const jsonLd = await productionPageJsonLd(data)

  return (
    <Main>
      <PageLayout>
        <Heading text={mainHeading} description={subheading} />

        <div className='my-4'>
          {!collections?.length ? (
            <NoResults item='productions' />
          ) : (
            <div className='flex flex-col gap-10 md:gap-16'>
              <section className={cn('flex flex-col gap-4')}>
                {/* <h2 className='font-display text-2xl sm:text-3xl font-medium text-primary-foreground'>
                  Collections
                </h2> */}
                <div
                  className={
                    cn()
                    // 'bg-secondary-light/5 border border-secondary-light/20 rounded',
                    // 'p-8',
                  }
                >
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
