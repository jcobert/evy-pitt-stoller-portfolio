import { FC } from 'react'

import { cn } from '@/utils/style'

type Props = {
  text?: string
  /** Display name of results item(s) (e.g. "posts"). */
  item?: string
  className?: string
}

const NoResults: FC<Props> = ({ text, item, className }) => {
  const message = item ? `No ${item} added yet` : 'Nothing added yet'

  return (
    <div
      className={cn(
        'max-w-prose w-fit text-pretty mx-auto rounded-sm p-8 border',
        'bg-white/50 border-secondary-light/40',
        className,
      )}
    >
      <p>{text || `${message}, but please check back soon!`}</p>
    </div>
  )
}

export default NoResults
