import { FC } from 'react'
import {
  FaEnvelope,
  FaFacebook,
  FaInstagram,
  FaLinkedinIn,
  FaPhone,
  FaPinterest,
  FaTiktok,
  FaXTwitter,
} from 'react-icons/fa6'
import { IconType } from 'react-icons/lib'

import { isObject } from '@/utils/general'
import { cn } from '@/utils/style'

export enum Contacts {
  linkedIn = 'LinkedIn',
  twitter = 'Twitter',
  email = 'Email',
  phone = 'Phone',
  instagram = 'Instagram',
  facebook = 'Facebook',
  tiktok = 'TikTok',
  pinterest = 'Pinterest',
}

export type ContactLinkMap = {
  [x in keyof typeof Contacts]?: string
}

export const contactIcons = {
  facebook: FaFacebook,
  instagram: FaInstagram,
  pinterest: FaPinterest,
  twitter: FaXTwitter,
  tiktok: FaTiktok,
  email: FaEnvelope,
  phone: FaPhone,
  linkedIn: FaLinkedinIn,
} satisfies {
  [key in keyof Required<ContactLinkMap>]: IconType
}

type Props = {
  links: ContactLinkMap
  className?: string
}

export const getContactLinksArray = (
  links: ContactLinkMap,
): [keyof typeof links, string][] => {
  if (!isObject(links)) return []
  return Object.entries(links)?.map(([name, val]) => {
    if (!Object.keys(Contacts)?.includes(name)) return null
    let url = val
    if (name === 'email') url = `mailto:${val}`
    if (name === 'phone') url = `tel:${val}`
    return [name, url]
  }) as [keyof typeof links, string][]
}

const ContactLinks: FC<Props> = ({ links = {}, className }) => {
  const contactLinks = getContactLinksArray(links)

  if (!contactLinks?.length) return null

  return (
    <div
      className={cn('flex items-center gap-10 sm:gap-8 flex-wrap', className)}
    >
      {contactLinks?.map(([name, url]) => {
        if (!Object.keys(Contacts)?.includes(name)) return null
        const Icon = contactIcons?.[name]
        return (
          <a key={name} href={url} className='flex hover:opacity-90 transition'>
            <div
              aria-label={name}
              className='rounded-full bg-purple inline-block p-2'
            >
              <Icon aria-hidden className='text-white text-2xl md:text-xl' />
            </div>
          </a>
        )
      })}
    </div>
  )
}

export default ContactLinks
