import { FC, ReactNode } from 'react'

import { cn } from '@/utils/style'

type Props = {
  children?: ReactNode
  className?: string
}

const Tag: FC<Props> = ({ children, className }) => {
  if (!children) return null
  return (
    <span
      className={cn([
        'rounded-md px-2 py-1 max-sm:px-4 size-fit border text-sm bg-gray-3 text-center capitalize font-medium whitespace-nowrap',
        className,
      ])}
    >
      {children}
    </span>
  )
}

export default Tag

// type Props = {
//   tag?: string
//   className?: string
//   href?: string
// }

// const Tag: FC<Props> = ({ tag, className, href }) => {
//   return href ? (
//     <Link
//       href={href}
//       className={cn([
//         'rounded-full px-4 py-px max-sm:py-2 max-sm:px-6 border border-gray-300 text-sm bg-gray-200 text-center capitalize font-medium whitespace-nowrap',
//         !!href && 'hover:bg-gray-100 hover:text-gray-700 transition',
//         className,
//       ])}
//     >
//       {tag}
//     </Link>
//   ) : (
//     <span
//       className={cn([
//         'rounded-full px-4 py-px max-sm:py-2 max-sm:px-6 border border-gray-300 text-sm bg-gray-200 text-center capitalize font-medium whitespace-nowrap',
//         !!href && 'hover:bg-gray-100 hover:text-gray-700 transition',
//         className,
//       ])}
//     >
//       {tag}
//     </span>
//   )
// }
