import { FC } from 'react'

import PageLayout from '@/components/layout/page-layout'
import { Button } from '@/components/ui/button'

const Page: FC = () => {
  return (
    <PageLayout>
      <Button className=''>Hello!</Button>
    </PageLayout>
  )
}

export default Page
