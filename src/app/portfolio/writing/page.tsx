import { Metadata } from 'next'
import { FC } from 'react'

import WritingCard from '@/components/features/portfolio/writing/writing-card'
import NoResults from '@/components/general/no-results'
import Heading from '@/components/layout/heading'
import Main from '@/components/layout/main'
import PageLayout from '@/components/layout/page-layout'

import { PageParams } from '@/types/general'

import { generatePageMeta } from '@/configuration/seo'
import { getProjects } from '@/sanity/lib/fetch'

export const metadata: Metadata = generatePageMeta({
  title: 'Writing',
  description: "A collection of articles that I've written.",
  url: '/portfolio/writing',
})

type Props = PageParams

const Page: FC<Props> = async () => {
  const projects = await getProjects({ projectType: 'writing' })

  return (
    <Main className='bg-background'>
      <PageLayout>
        <Heading
          text='Writing'
          description="Look, mom, I'm a published writer!"
        />
        <section className='my-4'>
          {!projects?.length ? (
            <NoResults item='writing' />
          ) : (
            <div className='grid grid-cols-1 md:grid-cols-2 grid-flow-row gap-x-6 gap-y-10 lg:gap-x-12'>
              {projects?.map((proj) => (
                <WritingCard key={proj?._id} writing={proj} />
              ))}
            </div>
          )}
        </section>
      </PageLayout>
    </Main>
  )
}

export default Page
