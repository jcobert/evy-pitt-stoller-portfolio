import ProductionCard from './production-card'
import { groupBy, sortBy } from 'lodash'
import { FC } from 'react'

import { cn } from '@/utils/style'

import AnimateOnScroll from '@/components/animation/animate-on-scroll'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

import { PROJECTS_BY_TYPE_QUERYResult } from '@/sanity/types/generated/types'

type Props = {
  projects: PROJECTS_BY_TYPE_QUERYResult | undefined | null
  // collections: PROJECT_COLLECTIONS_QUERYResult | undefined | null
  className?: string
}

const UNGROUPED_ID = '__UNGROUPED__'

const ProductionGroups: FC<Props> = ({ projects, className }) => {
  const projectsByCategory = groupBy(
    projects,
    (p) => p?.category?.name || UNGROUPED_ID,
  )

  const unassignedGroup = Object.entries(projectsByCategory)?.find(
    ([cat]) => cat === UNGROUPED_ID,
  ) || ['', []]

  const groups = sortBy(
    Object.entries(projectsByCategory)?.filter(([cat]) => cat !== UNGROUPED_ID),
    ([cat]) => cat,
  )?.concat(unassignedGroup[1]?.length ? [unassignedGroup] : [])

  return (
    <section className={cn('flex flex-col gap-6', className)}>
      <Accordion
        type='multiple'
        defaultValue={[groups?.[0]?.[0] || '']}
        // defaultValue={['collections']}
      >
        {/* <AccordionItem value='collections'>
          <AccordionTrigger className='font-display text-2xl sm:text-3xl font-medium text-primary-foreground hover:text-secondary transition capitalize'>
            Collections
          </AccordionTrigger>
          <AccordionContent className='pb-6 px-2 bg-accent rounded'>
            <div className={cn('bg-accent__ border__ rounded', 'p-8__')}>
              <div
                className={cn(
                  'grid grid-flow-row grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-10',
                )}
              >
                {collections?.map((col) => (
                  <CollectionCard key={col?._id} collection={col} />
                ))}
              </div>
            </div>
          </AccordionContent>
        </AccordionItem> */}

        {groups?.map(([cat, projs]) => {
          let heading = cat === UNGROUPED_ID ? 'Others' : cat
          if (groups?.length === 1) heading = 'All Projects'
          return (
            <AccordionItem key={cat} value={cat}>
              <AccordionTrigger className='font-display text-2xl sm:text-3xl font-medium text-primary-foreground hover:text-secondary transition capitalize'>
                {heading}
              </AccordionTrigger>
              <AccordionContent className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 grid-flow-row gap-x-6 gap-y-10'>
                {projs?.map((proj, i) => (
                  <AnimateOnScroll
                    key={proj?._id}
                    animations={['slideInFromBottom', 'fadeIn']}
                    className='duration-500'
                    threshold={0.1}
                  >
                    <ProductionCard production={proj} />
                    {i < projs.length - 1 ? (
                      <div
                        aria-hidden
                        className='sm:hidden h-px bg-gradient-to-r from-accent/10 via-primary-foreground/10 to-accent/10 mt-6'
                      />
                    ) : null}
                  </AnimateOnScroll>
                ))}
              </AccordionContent>
            </AccordionItem>
          )
        })}
      </Accordion>
    </section>
  )
}

export default ProductionGroups
