import { format, isValid, parseISO } from 'date-fns'

export const formatDate = (date: string | undefined) => {
  if (!date) return ''
  const parsedDate = parseISO(date)
  if (!isValid(parsedDate)) return ''
  return format(parsedDate, 'MMM dd, yyyy')
}
