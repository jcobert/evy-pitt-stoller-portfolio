import ProductionCard from '../production/production-card'
import SeriesCard from '../series/series-card'
import { FC } from 'react'

import AnimateOnScroll from '@/components/animation/animate-on-scroll'
import PortableBlockContent from '@/components/general/portable/portable-block-content'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

import { PROJECT_COLLECTION_BY_SLUG_QUERYResult } from '@/sanity/types/generated/types'

type Props = {
  collection: PROJECT_COLLECTION_BY_SLUG_QUERYResult | undefined
}

const CollectionPage: FC<Props> = async ({ collection }) => {
  const { description, sections } = collection || {}

  // const coverPhoto = mainImage || projects?.[0]?.mainImage
  // const imageUrl = getSanityImageUrl(coverPhoto)

  return (
    <div className='flex flex-col gap-4 sm:gap-8 items-center'>
      <PortableBlockContent value={description} />

      <section className='w-full'>
        <Accordion
          type='multiple'
          defaultValue={sections?.map((sec) => sec?._key)}
        >
          {sections
            ?.filter((sec) => sec?.projects?.length || sec?.series?.length)
            ?.map((sec) => (
              <AccordionItem key={sec?._key} value={sec?._key} className='py-4'>
                <AccordionTrigger className='font-display text-2xl sm:text-3xl font-medium text-primary-foreground hover:text-secondary transition capitalize'>
                  {sec?.title}
                </AccordionTrigger>
                <AccordionContent className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 grid-flow-row gap-x-6 gap-y-10 pb-6'>
                  {sec?.projects?.map((proj, i) => (
                    <AnimateOnScroll
                      key={proj?._id}
                      animations={['slideInFromBottom', 'fadeIn']}
                      className='duration-500'
                      threshold={0}
                    >
                      <ProductionCard
                        production={proj}
                        showDescription={false}
                      />
                      {i < (sec?.projects?.length || 0) - 1 ? (
                        <div
                          aria-hidden
                          className='sm:hidden h-px bg-gradient-to-r from-accent/10 via-primary-foreground/10 to-accent/10 mt-6'
                        />
                      ) : null}
                    </AnimateOnScroll>
                  ))}
                  {sec?.series?.map((ser, i) => (
                    <AnimateOnScroll
                      key={ser?._id}
                      animations={['slideInFromBottom', 'fadeIn']}
                      className='duration-500'
                      threshold={0}
                    >
                      <SeriesCard series={ser} />
                      {i < (sec?.series?.length || 0) - 1 ? (
                        <div
                          aria-hidden
                          className='sm:hidden h-px bg-gradient-to-r from-accent/10 via-primary-foreground/10 to-accent/10 mt-6'
                        />
                      ) : null}
                    </AnimateOnScroll>
                  ))}
                </AccordionContent>
              </AccordionItem>
            ))}
        </Accordion>
      </section>

      {/* <div
        className={cn(
          'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 grid-flow-row',
          'gap-x-6 lg:gap-x-10 xl:gap-x-16 gap-y-10',
          'px-4 sm:px-12',
          'mt-6',
        )}
      >
        {projects?.map((proj) => (
          <ProjectCard key={proj?._id} project={proj} />
        ))}
        {series?.map((s) => <SeriesCard key={s?._id} series={s} />)}
      </div> */}
    </div>
  )
}

export default CollectionPage
