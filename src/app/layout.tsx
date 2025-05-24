import type { Metadata } from 'next'
import { Poppins, Righteous } from 'next/font/google'
import { ReactNode } from 'react'

import { cn } from '@/utils/style'

import ProgressProvider from '@/providers/progress-provider'

import Header from '@/components/layout/header/header'

import '@/styles/globals.css'

export const metadata: Metadata = {
  title: 'Evy Pitt Stoller',
}

const poppins = Poppins({
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  subsets: ['latin'],
  variable: '--font-poppins',
})

const righteous = Righteous({
  weight: ['400'],
  subsets: ['latin'],
  variable: '--font-righteous',
})

const fontVars = cn([poppins.variable, righteous.variable])

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode
}>) {
  return (
    <html lang='en' className={fontVars}>
      <body className='antialiased'>
        <ProgressProvider>
          <div className='flex flex-col h-full min-h-dvh'>
            <Header />
            <div className='grow h-0'>{children}</div>
            {/** @todo add footer. */}
            <div />
          </div>
        </ProgressProvider>
      </body>
    </html>
  )
}
