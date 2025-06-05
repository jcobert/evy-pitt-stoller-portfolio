import { writingSlugPageMeta } from './(data)/meta'
import { writingSlugPageJsonLd } from './(data)/structured'
import { Metadata } from 'next'
import { FC } from 'react'

import WritingPost from '@/components/features/portfolio/writing/writing-post'
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

export type WritingSlugPageData = Awaited<ReturnType<typeof loadContent>> &
  Awaited<Props['params']>

export const generateMetadata = async ({
  params,
}: Props): Promise<Metadata> => {
  const { slug } = await params
  const { project } = await loadContent(slug)
  return writingSlugPageMeta({ project, slug })
}

export const generateStaticParams = async () => {
  const writing = await getProjects({ projectType: 'writing' })
  return (writing || [])?.map(({ slug }) => ({ slug: slug?.current }))
}

const Page: FC<Props> = async ({ params }) => {
  const slug = (await params)?.slug

  const { project } = await loadContent(slug)

  const jsonLd = await writingSlugPageJsonLd({ project, slug })

  return (
    <Main className='bg-background'>
      <PageLayout back={{ href: '/portfolio/writing', text: 'Back' }}>
        <Heading text={project?.title} />
        <section>
          <WritingPost writing={project} />
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
