import { Metadata } from 'next'
import { FC } from 'react'

import WritingPost from '@/components/features/portfolio/writing/writing-post'
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
    title: `Writing - ${project?.title}`,
    url: `/portfolio/writing/${slug}`,
  })
}

export const generateStaticParams = async () => {
  const writing = await getProjects({
    context: 'generateStaticParams',
    projectType: 'writing',
  })
  return (writing || [])?.map(({ slug }) => ({ slug: slug?.current }))
}

const Page: FC<Props> = async ({ params }) => {
  const slug = (await params)?.slug

  const { project } = await loadContent('component', slug)

  return (
    <Main className='bg-background'>
      <PageLayout back={{ href: '/portfolio/writing', text: 'Back' }}>
        <Heading text={project?.title} />
        <section>
          <WritingPost writing={project} />
        </section>
      </PageLayout>
    </Main>
  )
}

export default Page
