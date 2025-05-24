import { Metadata } from 'next'
import { FC } from 'react'

import ProductionCard from '@/components/features/production/production-card'
import NoResults from '@/components/general/no-results'
import Heading from '@/components/layout/heading'
import Main from '@/components/layout/main'
import PageLayout from '@/components/layout/page-layout'

import { PageParams } from '@/types/general'

import { generatePageMeta } from '@/configuration/seo'
import { client } from '@/sanity/lib/client'
import { PROJECTS_QUERY } from '@/sanity/lib/queries/projects-query'
import { PROJECTS_QUERYResult } from '@/sanity/types/generated/types'

export const metadata: Metadata = generatePageMeta({
  title: 'Production',
  description: "A collection of media projects that I've worked on.",
  url: '/works/productions',
})

type Props = PageParams

const Page: FC<Props> = async () => {
  const projects = await client.fetch<PROJECTS_QUERYResult>(PROJECTS_QUERY)

  return (
    <Main className='bg-background'>
      <PageLayout>
        <Heading
          text='Production'
          description="Check out some of the awesome projects I've worked on!"
        />
        <section className='my-4 pb-8'>
          {!projects?.length ? (
            <NoResults item='productions' />
          ) : (
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 grid-flow-row gap-6'>
              {projects?.map((proj) => (
                <ProductionCard key={proj?._id} production={proj} />
              ))}
            </div>
          )}
        </section>
      </PageLayout>

      {/* <section className='bg-purple'>
        <div className='w-full h-96'></div>
      </section> */}
    </Main>
  )
}

export default Page
