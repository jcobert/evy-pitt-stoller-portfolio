import { collectionSlugPageMeta } from './(data)/meta'
import { collectionSlugPageJsonLd } from './(data)/structured'
import { Metadata } from 'next'
import Link from 'next/link'
import { FC } from 'react'

import CollectionPage from '@/components/features/portfolio/collection/collection-page'
import NoResults from '@/components/general/no-results'
import Heading from '@/components/layout/heading'
import Main from '@/components/layout/main'
import PageLayout from '@/components/layout/page-layout'
import { Button } from '@/components/ui/button'

import { PageParams } from '@/types/general'

import {
  getAllProjectCollections,
  getProjectCollection,
} from '@/sanity/lib/fetch'

type Props = PageParams<{ slug: string }>

const loadContent = async (slug: Awaited<Props['params']>['slug']) => {
  const [collection] = await Promise.all([getProjectCollection({ slug })])
  return { collection }
}

export type CollectionSlugPageData = Awaited<ReturnType<typeof loadContent>> &
  Awaited<Props['params']>

export const generateMetadata = async ({
  params,
}: Props): Promise<Metadata> => {
  const { slug } = await params
  const { collection } = await loadContent(slug)
  return collectionSlugPageMeta({ collection, slug })
}

export const generateStaticParams = async () => {
  const collections = await getAllProjectCollections()
  return (collections || [])?.map(({ slug }) => ({ slug: slug?.current }))
}

const Page: FC<Props> = async ({ params }) => {
  const slug = (await params)?.slug

  const { collection } = await loadContent(slug)

  const backLink = '/portfolio/production'

  const jsonLd = await collectionSlugPageJsonLd({
    collection,
    slug,
  })

  return (
    <Main>
      <PageLayout
        back={collection ? { href: backLink, text: 'Back' } : undefined}
      >
        {collection ? (
          <>
            <Heading text={collection?.title} />
            <section>
              <CollectionPage collection={collection} />
            </section>
          </>
        ) : (
          <div className='flex flex-col items-center justify-center mt-24'>
            <NoResults
              text='Collection not found'
              className='border-none bg-transparent font-display text-3xl px-2 mt-4 text-secondary'
            />
            <Button asChild variant='secondary'>
              <Link href={backLink}>All projects</Link>
            </Button>
          </div>
        )}
      </PageLayout>

      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </Main>
  )
}

export default Page
