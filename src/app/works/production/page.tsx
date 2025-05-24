import { Metadata } from 'next'
import { FC } from 'react'

import Heading from '@/components/layout/heading'
import Main from '@/components/layout/main'
import PageLayout from '@/components/layout/page-layout'

import { PageParams } from '@/types/general'

import { generatePageMeta } from '@/configuration/seo'

export const metadata: Metadata = generatePageMeta({
  title: 'Production',
  description: "A collection of media projects that I've worked on.",
  url: '/works/productions',
})

type Props = PageParams

const Page: FC<Props> = async () => {
  return (
    <Main className='bg-background'>
      <PageLayout>
        <Heading
          text='Production'
          description="Check out some of the awesome projects I've worked on!"
        />
        <section></section>
      </PageLayout>

      <section className='bg-purple'>
        <div className='w-full h-96'></div>
      </section>
    </Main>
  )
}

export default Page
