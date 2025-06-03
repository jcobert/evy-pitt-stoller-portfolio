import { Metadata } from 'next'
import Link from 'next/link'
import { FC } from 'react'

import { cn } from '@/utils/style'

import ProductionCard from '@/components/features/portfolio/production/production-card'
import WritingCard from '@/components/features/portfolio/writing/writing-card'
import NoResults from '@/components/general/no-results'
import Separator from '@/components/general/separator'
import Heading from '@/components/layout/heading'
import Main from '@/components/layout/main'
import PageLayout from '@/components/layout/page-layout'
import { Button } from '@/components/ui/button'

import { PageParams } from '@/types/general'

import { generatePageMeta } from '@/configuration/seo'
import { getPage, getProjects } from '@/sanity/lib/fetch'

const loadContent = async () => {
  const [portfolioPage, productionPage, writingPage, productions, writing] =
    await Promise.all([
      getPage('portfolioPage'),
      getPage('productionPage'),
      getPage('writingPage'),
      getProjects({ projectType: 'production' }),
      getProjects({ projectType: 'writing' }),
    ])

  return { portfolioPage, productionPage, writingPage, productions, writing }
}

export const generateMetadata = async (): Promise<Metadata> => {
  const { portfolioPage } = await loadContent()
  const { heading, seo } = portfolioPage || {}

  const title = heading?.mainHeading

  return generatePageMeta({
    title,
    description: seo?.description,
    url: '/portfolio',
  })
}

type Props = PageParams

const Page: FC<Props> = async () => {
  const { portfolioPage, productionPage, writingPage, productions, writing } =
    await loadContent()

  const mainHeading = portfolioPage?.heading?.mainHeading || 'Portfolio'
  const subheading =
    portfolioPage?.heading?.subheading ||
    "A collection of projects that I've worked on."

  return (
    <Main>
      <PageLayout>
        <Heading text={mainHeading} description={subheading} />
      </PageLayout>

      <section className='layout px-4 md:px-12 flex flex-col gap-12 py-8'>
        <div className='max-w-prose flex flex-col gap-2'>
          <h3 className='text-2xl sm:text-3xl md:text-4xl font-semibold font-display text-balance text-muted-foreground border-b lg:w-1/2 min-w-fit pb-2'>
            {productionPage?.heading?.mainHeading}
          </h3>
          {/* <p className='text-balance text-lg text-primary/70__ md:max-w-xs'>
            {productionPage?.heading?.subheading}
          </p> */}
        </div>
        {!productions?.length ? (
          <NoResults
            item='projects'
            className='bg-white/50 border-secondary-light/40'
          />
        ) : (
          <div className='flex flex-col gap-12 items-center'>
            <div
              className={cn(
                'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3__ lg:grid-cols-4__ grid-flow-row',
                'gap-x-6 lg:gap-x-10 xl:gap-x-16 gap-y-10',
                'px-4 sm:px-16__',
              )}
            >
              {productions
                ?.slice(0, 2)
                ?.map((prod) => (
                  <ProductionCard
                    key={prod?._id}
                    production={prod}
                    className=''
                    showDescription={false}
                    showDate={false}
                  />
                ))}
            </div>

            <Button asChild className='w-fit' variant='outline'>
              <Link href='/portfolio/production'>More projects</Link>
            </Button>
          </div>
        )}
      </section>

      <Separator className='my-8 md:w-1/3 mx-auto' />

      <section className='layout px-4 md:px-12 flex flex-col gap-12 py-8'>
        <div className='max-w-prose flex flex-col gap-2'>
          <h3 className='text-2xl sm:text-3xl md:text-4xl font-semibold font-display text-balance text-muted-foreground border-b lg:w-1/2 min-w-fit pb-2'>
            {writingPage?.heading?.mainHeading}
          </h3>
          {/* <p className='text-balance text-lg text-secondary/70__ md:max-w-xs'>
            {writingPage?.heading?.subheading}
          </p> */}
        </div>

        {!writing?.length ? (
          <NoResults
            item='projects'
            className='bg-white/50 border-secondary-light/40'
          />
        ) : (
          <div className='flex flex-col gap-16 items-center'>
            <div
              className={cn(
                'grid grid-cols-1 lg:grid-cols-2 grid-flow-row',
                'gap-x-6 lg:gap-x-10 xl:gap-x-16 gap-y-10',
                'w-full px-4 lg:px-10__',
              )}
            >
              {writing?.map((prod) => (
                <WritingCard key={prod?._id} writing={prod} className='' />
              ))}
            </div>

            <Button asChild className='w-fit' variant='outline'>
              <Link href='/portfolio/writing'>More projects</Link>
            </Button>
          </div>
        )}
      </section>
    </Main>
  )
}

export default Page
