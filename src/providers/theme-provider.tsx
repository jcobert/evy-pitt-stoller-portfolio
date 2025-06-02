import { ThemeProvider as TP, ThemeProviderProps } from 'next-themes'
import { FC } from 'react'

export const THEMES = ['1', '2', '3']

const ThemeProvider: FC<ThemeProviderProps> = (props) => {
  return <TP themes={THEMES} defaultTheme='1' enableSystem={false} {...props} />
}

export default ThemeProvider
