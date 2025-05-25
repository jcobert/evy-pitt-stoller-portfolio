import { Metadata } from 'next'
import { FC } from 'react'

import ProductionPost from '@/components/features/production/production-post'
import Heading from '@/components/layout/heading'
import Main from '@/components/layout/main'
import PageLayout from '@/components/layout/page-layout'

import { PageParams } from '@/types/general'

import { generatePageMeta } from '@/configuration/seo'
import { getProject } from '@/sanity/lib/fetch'

/** @todo Update. */
export const metadata: Metadata = generatePageMeta({
  title: 'Production',
  description: "A collection of media projects that I've worked on.",
  url: '/works/productions',
})

type Props = PageParams<{ slug: string }>

const Page: FC<Props> = async ({ params }) => {
  const slug = (await params)?.slug

  const production = await getProject({ slug })

  return (
    <Main className='bg-background'>
      <PageLayout>
        <Heading text={production?.title} />
        <section>
          <ProductionPost production={production} />
        </section>
      </PageLayout>
    </Main>
  )
}

export default Page
