import type { Metadata } from 'next'
import { ReactNode } from 'react'

import ProgressProvider from '@/providers/progress-provider'

import Header from '@/components/layout/header/header'

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
        <ProgressProvider>
          <div className='flex flex-col h-full min-h-dvh'>
            <Header />
            <div className='grow'>{children}</div>
            {/** @todo add footer. */}
            <div />
          </div>
        </ProgressProvider>
      </body>
    </html>
  )
}
