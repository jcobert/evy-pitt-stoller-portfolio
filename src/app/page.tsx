import { Metadata } from 'next'
import { FC } from 'react'

import HereoSection from '@/components/features/home/hero-section'
import ProductionsSection from '@/components/features/home/productions-section'
import WritingSection from '@/components/features/home/writing-section'
import Main from '@/components/layout/main'
import PageLayout from '@/components/layout/page-layout'

import { generatePageMeta } from '@/configuration/seo'
import { getProfile, getProjects } from '@/sanity/lib/fetch'

const loadContent = async () => {
  const profile = await getProfile()
  const projects = await getProjects()
  const productions = projects?.filter((p) => p?.projectType === 'production')
  const writing = projects?.filter((p) => p?.projectType === 'writing')
  return { profile, productions, writing }
}

export const metadata: Metadata = generatePageMeta({
  title: 'Home',
  description: '',
  url: '/',
})

const Page: FC = async () => {
  const { profile, productions, writing } = await loadContent()

  return (
    <Main className='bg-gradient-to-br from-light-green/90 from-20% to-dark-green/15'>
      <PageLayout wrapperClassName='max-sm:w-full' className='max-md:px-0'>
        <HereoSection profile={profile} />
      </PageLayout>
      <ProductionsSection productions={productions} />
      <WritingSection writing={writing} />
    </Main>
  )
}

export default Page
