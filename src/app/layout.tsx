import type { Metadata } from 'next'
import { Bodoni_Moda, Inter } from 'next/font/google'
import { ReactNode } from 'react'

import { cn } from '@/utils/style'

import ProgressProvider from '@/providers/progress-provider'

import Footer from '@/components/layout/footer'
import Header from '@/components/layout/header/header'

import '@/styles/globals.css'

export const metadata: Metadata = {
  title: 'Evy Pitt Stoller',
}

const bodoniModa = Bodoni_Moda({
  // weight: ['400', '500', '600', '700', '800', '900'],
  subsets: ['latin'],
  variable: '--font-bodoni-moda',
})

const inter = Inter({
  // weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  subsets: ['latin'],
  variable: '--font-inter',
})

const fontVars = cn([bodoniModa.variable, inter.variable])

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode
}>) {
  return (
    <html lang='en' suppressHydrationWarning className={fontVars}>
      <body className='antialiased'>
        <ProgressProvider>
          <div className='flex flex-col h-full min-h-dvh'>
            <Header />
            {children}
            <Footer />
          </div>
        </ProgressProvider>
      </body>
    </html>
  )
}
