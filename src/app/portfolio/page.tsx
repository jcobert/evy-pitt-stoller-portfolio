import { portfolioPageMeta } from './(data)/meta'
import { portfolioPageJsonLd } from './(data)/structured'
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

export type PortfolioPageData = Awaited<ReturnType<typeof loadContent>>

export const generateMetadata = async (): Promise<Metadata> => {
  const data = await loadContent()
  return portfolioPageMeta(data)
}

type Props = PageParams

const Page: FC<Props> = async () => {
  const data = await loadContent()
  const { portfolioPage, productionPage, writingPage, productions, writing } =
    data

  const mainHeading = portfolioPage?.heading?.mainHeading || 'Portfolio'
  const subheading = portfolioPage?.heading?.subheading

  const jsonLd = await portfolioPageJsonLd(data)

  return (
    <Main>
      <PageLayout>
        <Heading text={mainHeading} description={subheading} />
        {!productions?.length && !writing?.length ? (
          <NoResults item='projects' className='my-4' />
        ) : null}
      </PageLayout>

      {productions?.length ? (
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
            <NoResults item='projects' />
          ) : (
            <div className='flex flex-col gap-12 items-center'>
              <div
                className={cn(
                  'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 grid-flow-row',
                  'gap-x-6 lg:gap-x-10 xl:gap-x-16 gap-y-10',
                  'px-4 sm:px-16__',
                )}
              >
                {productions
                  ?.slice(0, 4)
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
      ) : null}

      {!!productions?.length && !!writing?.length ? (
        <Separator className='my-8 md:w-1/3 mx-auto' />
      ) : null}

      {writing?.length ? (
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
            <NoResults item='projects' />
          ) : (
            <div className='flex flex-col gap-16 items-center'>
              <div
                className={cn(
                  'grid grid-cols-1 xl:grid-cols-2 grid-flow-row',
                  'gap-x-6 lg:gap-x-10 xl:gap-x-16 gap-y-10',
                  'w-full px-4 lg:px-10__',
                )}
              >
                {writing
                  ?.slice(0, 2)
                  ?.map((prod) => (
                    <WritingCard key={prod?._id} writing={prod} className='' />
                  ))}
              </div>

              <Button asChild className='w-fit' variant='outline'>
                <Link href='/portfolio/writing'>More projects</Link>
              </Button>
            </div>
          )}
        </section>
      ) : null}

      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </Main>
  )
}

export default Page
