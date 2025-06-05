import { productionSlugPageMeta } from './(data)/meta'
import { productionSlugPageJsonLd } from './(data)/structured'
import { Metadata } from 'next'
import { FC } from 'react'

import ProductionPost from '@/components/features/portfolio/production/production-post'
import Heading from '@/components/layout/heading'
import Main from '@/components/layout/main'
import PageLayout from '@/components/layout/page-layout'

import { PageParams } from '@/types/general'

import { getProject, getProjects } from '@/sanity/lib/fetch'

type Props = PageParams<{ slug: string }>

const loadContent = async (slug: Awaited<Props['params']>['slug']) => {
  const project = await getProject({ slug })
  return { project }
}

export type ProductionSlugPageData = Awaited<ReturnType<typeof loadContent>> &
  Awaited<Props['params']>

export const generateMetadata = async ({
  params,
}: Props): Promise<Metadata> => {
  const { slug } = await params
  const { project } = await loadContent(slug)
  return productionSlugPageMeta({ project, slug })
}

export const generateStaticParams = async () => {
  const productions = await getProjects({ projectType: 'production' })
  return (productions || [])?.map(({ slug }) => ({ slug: slug?.current }))
}

const Page: FC<Props> = async ({ params }) => {
  const slug = (await params)?.slug

  const project = await getProject({ slug })

  const jsonLd = await productionSlugPageJsonLd({ project, slug })

  return (
    <Main className='bg-background'>
      <PageLayout back={{ href: '/portfolio/production', text: 'Back' }}>
        <Heading text={project?.title} />
        <section>
          <ProductionPost production={project} />
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
