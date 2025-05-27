import { buttonVariants } from '../ui/button'
import Link, { type LinkProps } from 'next/link'
import React, { FC } from 'react'
import { IoIosArrowBack } from 'react-icons/io'

import { cn } from '@/utils/style'

export type BackProps = {
  text?: string
  className?: string
} & LinkProps

const Back: FC<BackProps> = ({ text = '', className = '', ...props }) => {
  return (
    <Link
      className={cn(
        buttonVariants({
          variant: 'ghost',
          className: cn(
            'flex items-center gap-1 w-fit group font-medium self-start print:hidden',
            className,
          ),
        }),
      )}
      {...props}
    >
      <IoIosArrowBack
        aria-label='back arrow'
        className='group-hover:text-gray-11 transition'
      />
      <span className='group-hover:text-gray-11 transition'>{text}</span>
    </Link>
  )
}

export default Back
