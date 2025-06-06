import { FC } from 'react'

import { cn } from '@/utils/style'

type Props = {
  /** Display name of results item(s) (e.g. "posts"). */
  item: string
  className?: string
}

const NoResults: FC<Props> = ({ item, className }) => {
  const text = item ? `No ${item} added yet` : 'Nothing added yet'

  return (
    <div
      className={cn(
        'max-w-prose w-fit text-pretty mx-auto rounded-sm p-8 border',
        'bg-white/50 border-secondary-light/40',
        className,
      )}
    >
      <p>{`${text}, but please check back soon!`}</p>
    </div>
  )
}

export default NoResults
