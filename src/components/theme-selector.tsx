'use client'

import { useTheme } from 'next-themes'
import { FC, useEffect, useState } from 'react'

import { cn } from '@/utils/style'

import { THEMES } from '@/providers/theme-provider'

type Props = {
  className?: string
}

const ThemeSelector: FC<Props> = ({ className }) => {
  const [isMounted, setIsMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) return null

  return (
    <select
      className={cn(
        'fixed bottom-4 right-4 bg-black/75 text-white border border-black rounded p-2 text-xs font-medium z-[999]',
        className,
      )}
      value={theme}
      onChange={(e) => {
        setTheme(e?.target?.value)
      }}
    >
      {THEMES?.map((t) => <option key={t} value={t}>{`Theme ${t}`}</option>)}
    </select>
  )
}

export default ThemeSelector
