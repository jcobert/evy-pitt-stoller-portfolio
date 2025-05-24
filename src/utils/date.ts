import { format, isValid, parseISO } from 'date-fns'

export const formatDate = (date: string) => {
  const parsedDate = parseISO(date)
  if (!isValid(parsedDate)) return ''
  return format(parsedDate, 'MMM dd, yyyy')
}
