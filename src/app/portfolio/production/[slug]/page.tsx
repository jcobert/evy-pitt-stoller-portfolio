import { productionSlugPageMeta } from './(data)/meta'
import { productionSlugPageJsonLd } from './(data)/structured'
import { Metadata } from 'next'
import Link from 'next/link'
import { FC } from 'react'

import ProductionPost from '@/components/features/portfolio/production/production-post'
import NoResults from '@/components/general/no-results'
import Heading from '@/components/layout/heading'
import Main from '@/components/layout/main'
import PageLayout from '@/components/layout/page-layout'
import { Button } from '@/components/ui/button'

import { PageParams } from '@/types/general'

import {
  getProject,
  getProjects,
  getProjectsBySeries,
} from '@/sanity/lib/fetch'

type Props = PageParams<{ slug: string }>

const loadContent = async (slug: Awaited<Props['params']>['slug']) => {
  const project = await getProject({ slug })
  const seriesProjects = await getProjectsBySeries({
    seriesId: project?.series?._id,
  })
  return { project, seriesProjects }
}

export type ProductionSlugPageData = Awaited<ReturnType<typeof loadContent>> &
  Awaited<Props['params']>

export const generateMetadata = async ({
  params,
}: Props): Promise<Metadata> => {
  const { slug } = await params
  const { project, seriesProjects } = await loadContent(slug)
  return productionSlugPageMeta({ project, slug, seriesProjects })
}

export const generateStaticParams = async () => {
  const productions = await getProjects({ projectType: 'production' })
  return (productions || [])?.map(({ slug }) => ({ slug: slug?.current }))
}

const Page: FC<Props> = async ({ params }) => {
  const slug = (await params)?.slug

  const { project, seriesProjects } = await loadContent(slug)

  const backLink = '/portfolio/production'

  const jsonLd = await productionSlugPageJsonLd({
    project,
    slug,
    seriesProjects,
  })

  return (
    <Main>
      <PageLayout
        back={project ? { href: backLink, text: 'Production' } : undefined}
      >
        {project ? (
          <>
            <Heading text={project?.title} />
            <section>
              <ProductionPost
                production={project}
                seriesProjects={seriesProjects}
              />
            </section>
          </>
        ) : (
          <div className='flex flex-col items-center justify-center mt-24'>
            <NoResults
              text='Production not found'
              className='border-none bg-transparent font-display text-3xl px-2 mt-4 text-secondary'
            />
            <Button asChild variant='secondary'>
              <Link href={backLink}>All productions</Link>
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
