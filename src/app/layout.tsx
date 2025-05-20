import type { Metadata } from 'next'
import { ReactNode } from 'react'

import ProgressProvider from '@/providers/progress-provider'

import '@/styles/globals.css'

export const metadata: Metadata = {
  title: 'Evy Pitt Stoller',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode
}>) {
  return (
    <html lang='en'>
      <body className='antialiased'>
        <ProgressProvider>{children}</ProgressProvider>
      </body>
    </html>
  )
}
