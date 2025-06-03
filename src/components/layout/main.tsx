import BackgroundImage from './background-image'
import { FC, ReactNode } from 'react'

import { cn } from '@/utils/style'

export type PageLayoutProps = {
  heading?: ReactNode
  children?: ReactNode
  defaultLayout?: boolean
  backgroundImage?: string
  className?: string
  pageClassName?: string
  backgroundImageClassName?: string
}

const Main: FC<PageLayoutProps> = ({
  children,
  backgroundImage,
  className,
  backgroundImageClassName,
}) => {
  return (
    <main
      className={cn(['h-full grow pb-16', 'bg-primary-light/40', className])}
    >
      {backgroundImage ? (
        <BackgroundImage
          backgroundImage={backgroundImage}
          className={backgroundImageClassName}
        />
      ) : null}

      <div
        className={cn([
          'items-center justify-start h-full',
          !!backgroundImage && 'relative',
        ])}
      >
        {children}
      </div>
    </main>
  )
}

export default Main
