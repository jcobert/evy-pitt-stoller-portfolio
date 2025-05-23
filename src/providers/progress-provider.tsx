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
      {...props}
    >
      {children}
    </AppProgressProvider>
  )
}

export default ProgressProvider
