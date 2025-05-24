import Link from 'next/link'
import React, { FC } from 'react'
import { FaArrowLeft } from 'react-icons/fa6'
import { NavbarProps } from 'sanity'

const StudioNavbar: FC<NavbarProps> = (props) => {
  return (
    <div className='flex flex-col w-full bg-background'>
      <Link
        className='w-fit mt-2 max-sm:mt-4 ml-4 font-medium text-sm flex items-center gap-2'
        href='/'
      >
        <FaArrowLeft />
        <span>Exit</span>
      </Link>
      <div className='flex-auto'>{props?.renderDefault(props)}</div>
    </div>
  )
}

export default StudioNavbar
