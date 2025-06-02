'use client'

import { Button } from './ui/button'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from './ui/collapsible'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import { useTheme } from 'next-themes'
import { FC, useEffect, useState } from 'react'
import { HexColorInput, HexColorPicker } from 'react-colorful'
import { HiOutlineColorSwatch } from 'react-icons/hi'
import { IoIosArrowDown } from 'react-icons/io'
import { IoColorPaletteOutline } from 'react-icons/io5'

import { cn } from '@/utils/style'

import { THEMES } from '@/providers/theme-provider'

import {
  Colors,
  DEFAULT_COLORS,
  useStoredSettings,
} from '@/hooks/use-stored-settings'

const LABELS = {
  primary: 'Primary',
  'primary-light': 'Primary Light',
  'primary-foreground': 'Primary Dark',
  secondary: 'Secondary',
  'secondary-light': 'Secondary Light',
  'secondary-extra-light': 'Secondary Extra Light',
} satisfies { [x in keyof Colors]: string }

type Props = {
  className?: string
}

const ThemeSelector: FC<Props> = ({ className }) => {
  const [isMounted, setIsMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const { colors, setColors, presets, setPresets } = useStoredSettings()

  useEffect(() => {
    if (!document.documentElement) return
    Object.entries(colors)?.forEach(([color, value]) => {
      document.documentElement.style.setProperty(
        `--${color}`,
        `${value?.startsWith('#') ? '' : '#'}${value}`,
      )
    })
  }, [colors, theme])

  if (!isMounted) return null

  return (
    <Popover>
      <PopoverTrigger className='fixed bottom-4 right-4 flex items-center justify-center bg-white/85 text-whitfe border border-gray-100 shadow-lg rounded-full p-2 size-16 text-xs font-medium z-[999]'>
        <IoColorPaletteOutline className='text-3xl text-blue-800' />
      </PopoverTrigger>
      <PopoverContent className='w-full flex flex-col gap-4 max-w-screen'>
        {/* <select
          className={cn(
            'fixed bottom-4 right-4 bg-black/75 text-white border border-black rounded p-2 text-xs font-medium z-[999]',
            className,
          )}
          value={theme}
          onChange={(e) => {
            setTheme(e?.target?.value)
          }}
        >
          {THEMES?.map((t) => (
            <option key={t} value={t}>{`Theme ${t}`}</option>
          ))}
        </select> */}

        <div className='flex flex-col gap-4'>
          {/* Inputs */}
          <div className='flex flex-col gap-3'>
            {Object.entries(LABELS)?.map(([key, label]) => (
              <div key={key} className='flex gap-3 items-center'>
                <label htmlFor={key} className='text-xs font-medium'>
                  {label}
                </label>
                <div className='flex items-center gap-2'>
                  <input
                    id={key}
                    className='rounded border text-sm p-1 w-[9ch] uppercase'
                    value={colors?.[key]}
                    onChange={(e) => {
                      setTheme('custom')
                      setColors((prev) => ({
                        ...prev,
                        [key]: e?.target?.value || '',
                      }))
                    }}
                  />
                  <Popover>
                    <PopoverTrigger className='border rounded p-1 flex gap-1'>
                      <HiOutlineColorSwatch />
                      <div
                        className='size-4 rounded-full border'
                        style={{ background: colors?.[key] }}
                      />
                    </PopoverTrigger>
                    <PopoverContent className='w-fit'>
                      <p className='text-xs mb-2'>{label}</p>
                      <HexColorPicker
                        color={colors?.[key]}
                        onChange={(val) => {
                          setTheme('custom')
                          setColors((prev) => ({
                            ...prev,
                            [key]: val || '',
                          }))
                        }}
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
            ))}
          </div>

          <Button
            variant='outline'
            className='text-black sm:w-fit sm:mx-auto'
            onClick={() => {
              setPresets((prev) => prev?.concat(colors))
            }}
          >
            Save theme
          </Button>

          <Button
            variant='ghost'
            className='text-black sm:w-fit sm:mx-auto'
            onClick={() => {
              setColors(() => DEFAULT_COLORS)
            }}
          >
            Reset to default
          </Button>
        </div>

        <Collapsible
          className='border rounded px-2 py-1'
          defaultOpen={!!presets?.length && presets?.length < 5}
        >
          <CollapsibleTrigger className='flex items-center justify-between w-full text-sm'>
            {/* <button type='button' className='data-[state=open]:rotate-180 w-full p-2 flex items-center bg-gray-50'>
              Saved themes
              <IoIosArrowDown />
            </button> */}
            Saved themes
            <IoIosArrowDown />
          </CollapsibleTrigger>
          <CollapsibleContent className='mt-4'>
            {/* Preset */}
            {presets?.length ? (
              <div className='flex gap-1 flex-wrap'>
                {presets?.map((preset, i) => (
                  <Button
                    key={`${i}-${preset?.primary}`}
                    variant='outline'
                    className='text-black bg-white text-xs pl-2'
                    onClick={() => {
                      setColors(preset)
                    }}
                  >
                    {/* {`Theme ${i + 1}`} */}
                    <div className='relative flex pr-2'>
                      <div
                        className='size-4 rounded-full border z-3'
                        style={{ background: preset?.primary }}
                      />
                      <div
                        className='size-4 rounded-full border absolute left-2 z-2'
                        style={{ background: preset?.['primary-light'] }}
                      />
                      <div
                        className='size-4 rounded-full border absolute left-4 z-1'
                        style={{ background: preset?.secondary }}
                      />
                    </div>
                  </Button>
                ))}
              </div>
            ) : null}
          </CollapsibleContent>
        </Collapsible>
      </PopoverContent>
    </Popover>
  )

  // return (
  //   <select
  //     className={cn(
  //       'fixed bottom-4 right-4 bg-black/75 text-white border border-black rounded p-2 text-xs font-medium z-[999]',
  //       className,
  //     )}
  //     value={theme}
  //     onChange={(e) => {
  //       setTheme(e?.target?.value)
  //     }}
  //   >
  //     {THEMES?.map((t) => <option key={t} value={t}>{`Theme ${t}`}</option>)}
  //   </select>
  // )
}

export default ThemeSelector
