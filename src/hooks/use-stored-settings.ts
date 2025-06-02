import { useLocalStorage } from 'usehooks-ts'

export type Colors = {
  primary: string
  'primary-light': string
  'primary-foreground': string
  secondary: string
  'secondary-light': string
  'secondary-extra-light': string
}

export const DEFAULT_COLORS = {
  primary: '#b8d6c0',
  'primary-light': '#f1f2d6',
  'primary-foreground': '#143109',
  secondary: '#81559b',
  'secondary-light': '#a97cc4',
  'secondary-extra-light': '#e7e7f9',
} satisfies Colors

export type StoredSettings = Colors

const storedSettingsKey = 'theme-colors' as const

const defaultSettings = DEFAULT_COLORS satisfies StoredSettings

type UseStoredSettingsProps = {
  initialSettings?: StoredSettings
}

export const useStoredSettings = ({
  initialSettings,
}: UseStoredSettingsProps = {}) => {
  const [colors, setColors] = useLocalStorage<StoredSettings>(
    storedSettingsKey,
    initialSettings ?? defaultSettings,
  )

  const [presets, setPresets] = useLocalStorage<Colors[]>('theme-presets', [])

  return { colors, setColors, presets, setPresets }
}
