'use client'

import { AppProgressProvider, AppProgressProviderProps } from '@bprogress/next'
import { FC } from 'react'

const ProgressProvider: FC<AppProgressProviderProps> = ({
  children,
  ...props
}) => {
  return (
    <AppProgressProvider
      options={{ showSpinner: false }}
      shallowRouting
      color='var(--secondary-light)'
      {...props}
    >
      {children}
    </AppProgressProvider>
  )
}

export default ProgressProvider
