import { Metadata } from 'next'
import { FC } from 'react'

import ProductionPost from '@/components/features/portfolio/production/production-post'
import Heading from '@/components/layout/heading'
import Main from '@/components/layout/main'
import PageLayout from '@/components/layout/page-layout'

import { PageParams } from '@/types/general'

import { generatePageMeta } from '@/configuration/seo'
import { SanityFetchContext, getProject, getProjects } from '@/sanity/lib/fetch'

type Props = PageParams<{ slug: string }>

const loadContent = async (
  context: SanityFetchContext,
  slug: Awaited<Props['params']>['slug'],
) => {
  const project = await getProject({ context, slug })
  return { project }
}

export const generateMetadata = async ({
  params,
}: Props): Promise<Metadata> => {
  const { slug } = await params
  const { project } = await loadContent('generateMetadata', slug)
  return generatePageMeta({
    title: `Production - ${project?.title}`,
    url: `/portfolio/production/${slug}`,
  })
}

export const generateStaticParams = async () => {
  const productions = await getProjects({
    context: 'generateStaticParams',
    projectType: 'production',
  })
  return (productions || [])?.map(({ slug }) => ({ slug: slug?.current }))
}

const Page: FC<Props> = async ({ params }) => {
  const slug = (await params)?.slug

  const { project } = await loadContent('component', slug)

  return (
    <Main className='bg-background'>
      <PageLayout back={{ href: '/portfolio/production', text: 'Back' }}>
        <Heading text={project?.title} />
        <section>
          <ProductionPost production={project} />
        </section>
      </PageLayout>
    </Main>
  )
}

export default Page
