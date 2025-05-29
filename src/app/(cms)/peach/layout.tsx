import { ReactNode } from 'react'

export default async function Layout({
  children,
}: Readonly<{
  children: ReactNode
}>) {
  return <div className='fixed top-0 z-[100] w-full'>{children}</div>
}
