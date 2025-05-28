import { Metadata } from 'next'
import { FC } from 'react'

import WritingPost from '@/components/features/portfolio/writing/writing-post'
import Heading from '@/components/layout/heading'
import Main from '@/components/layout/main'
import PageLayout from '@/components/layout/page-layout'

import { PageParams } from '@/types/general'

import { generatePageMeta } from '@/configuration/seo'
import { getProject, getProjects } from '@/sanity/lib/fetch'

type Props = PageParams<{ slug: string }>

export const generateMetadata = async ({
  params,
}: Props): Promise<Metadata> => {
  const { slug } = await params
  const writing = await getProject({ slug })
  return generatePageMeta({
    title: `Writing - ${writing?.title}`,
    url: `/portfolio/writing/${slug}`,
  })
}

export const generateStaticParams = async () => {
  const writing = await getProjects({ projectType: 'writing' })
  return (writing || [])?.map(({ slug }) => ({ slug: slug?.current }))
}

const Page: FC<Props> = async ({ params }) => {
  const slug = (await params)?.slug

  const writing = await getProject({ slug })

  return (
    <Main className='bg-background'>
      <PageLayout back={{ href: '/portfolio/writing', text: 'Back' }}>
        <Heading text={writing?.title} />
        <section>
          <WritingPost writing={writing} />
        </section>
      </PageLayout>
    </Main>
  )
}

export default Page
