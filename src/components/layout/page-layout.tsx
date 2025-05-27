import Back, { BackProps } from '../general/back'
import { FC, ReactNode } from 'react'

import { cn } from '@/utils/style'

export type PageLayoutProps = {
  // heading?: ReactNode
  children?: ReactNode
  defaultLayout?: boolean
  className?: string
  wrapperClassName?: string
  back?: BackProps
}

const PageLayout: FC<PageLayoutProps> = ({
  // heading,
  children,
  defaultLayout = true,
  className,
  wrapperClassName,
  back,
}) => {
  // const pageHeading =
  //   typeof heading === 'string' ? <Heading text={heading} /> : heading

  return (
    <div
      className={cn([
        'flex flex-col gap-2 h-full',
        defaultLayout && 'layout py-6__ md:py-10__',
        wrapperClassName,
      ])}
    >
      {/* {heading ? pageHeading : null} */}
      <div
        className={cn('h-full px-4 md:px-12 xl:px-24__ sm:pb-8__', className)}
      >
        {back?.href ? (
          <Back className='mt-4 md:mt-6 -mb-2 md:-mb-4' {...back} />
        ) : null}
        {children}
      </div>
    </div>
  )
}

export default PageLayout
