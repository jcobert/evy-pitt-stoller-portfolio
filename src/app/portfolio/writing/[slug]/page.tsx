import { writingSlugPageMeta } from './(data)/meta'
import { writingSlugPageJsonLd } from './(data)/structured'
import { Metadata } from 'next'
import Link from 'next/link'
import { FC } from 'react'

import WritingPost from '@/components/features/portfolio/writing/writing-post'
import NoResults from '@/components/general/no-results'
import Heading from '@/components/layout/heading'
import Main from '@/components/layout/main'
import PageLayout from '@/components/layout/page-layout'
import { Button } from '@/components/ui/button'

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

  const backLink = '/portfolio/writing'

  const jsonLd = await writingSlugPageJsonLd({ project, slug })

  return (
    <Main className='bg-background'>
      <PageLayout back={project ? { href: backLink, text: 'Back' } : undefined}>
        {project ? (
          <>
            <Heading text={project?.title} />
            <section>
              <WritingPost writing={project} />
            </section>
          </>
        ) : (
          <div className='flex flex-col items-center justify-center mt-24'>
            <NoResults
              text='Writing not found'
              className='border-none bg-transparent font-display text-3xl px-2 mt-4 text-secondary'
            />
            <Button asChild variant='secondary'>
              <Link href={backLink}>All writing</Link>
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
