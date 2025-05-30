import { Metadata } from 'next'
import { FC } from 'react'

import ProductionCard from '@/components/features/portfolio/production/production-card'
import NoResults from '@/components/general/no-results'
import Heading from '@/components/layout/heading'
import Main from '@/components/layout/main'
import PageLayout from '@/components/layout/page-layout'

import { PageParams } from '@/types/general'

import { generatePageMeta } from '@/configuration/seo'
import { getProjects } from '@/sanity/lib/fetch'

export const metadata: Metadata = generatePageMeta({
  title: 'Production',
  description: "A collection of media projects that I've worked on.",
  url: '/portfolio/production',
})

type Props = PageParams

const Page: FC<Props> = async () => {
  const projects = await getProjects({ projectType: 'production' })

  return (
    <Main className='bg-background'>
      <PageLayout>
        <Heading
          text='Production'
          description="Check out some of the awesome projects I've worked on!"
        />
        <section className='my-4'>
          {!projects?.length ? (
            <NoResults item='productions' />
          ) : (
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 grid-flow-row gap-x-6 gap-y-10'>
              {projects?.map((proj, i) => (
                <div key={proj?._id}>
                  <ProductionCard production={proj} />
                  {i < projects.length - 1 ? (
                    <div
                      aria-hidden
                      className='sm:hidden h-px bg-gradient-to-r from-accent/10 via-foreground/10 to-accent/10 mt-6'
                    />
                  ) : null}
                </div>
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
