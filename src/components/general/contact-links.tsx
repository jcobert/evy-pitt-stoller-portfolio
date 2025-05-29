import { sortBy } from 'lodash'
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

export const getContactLinksArray = (
  links: ContactLinkMap,
  options?: {
    include?: (keyof typeof links)[]
    exclude?: (keyof typeof links)[]
  },
): [keyof typeof links, { url: string; text: string }][] => {
  if (!isObject(links)) return []
  const filtered = Object.entries(links)
    ?.filter(
      ([name]) =>
        Object.keys(Contacts)?.includes(name) &&
        (options?.include?.length
          ? options?.include?.includes(name as keyof typeof links)
          : true) &&
        (options?.exclude?.length
          ? !options?.exclude?.includes(name as keyof typeof links)
          : true),
    )
    ?.map(([name, val]) => {
      let url = val
      if (name === 'email') url = `mailto:${val}`
      if (name === 'phone') url = `tel:${val}`
      return [name, { url, text: val }]
    }) as [keyof typeof links, { url: string; text: string }][]

  return sortBy(filtered, ([link]) =>
    Object.keys(Contacts)?.findIndex((c) => c === link),
  )
}

type ContactIconProps = {
  name: keyof ContactLinkMap
  className?: string
  iconClassName?: string
}

export const ContactIcon: FC<ContactIconProps> = ({
  name,
  className,
  iconClassName,
}) => {
  const Icon = contactIcons?.[name]
  return (
    <div
      aria-label={name}
      className={cn('rounded-full bg-purple inline-block p-2', className)}
    >
      <Icon
        aria-hidden
        className={cn('text-white text-2xl md:text-xl', iconClassName)}
      />
    </div>
  )
}

type Props = {
  links: ContactLinkMap | undefined
  className?: string
  include?: (keyof ContactLinkMap)[]
  exclude?: (keyof ContactLinkMap)[]
  iconProps?: Omit<Partial<ContactIconProps>, 'name'>
}

const ContactLinks: FC<Props> = ({
  links = {},
  className,
  iconProps,
  ...options
}) => {
  const contactLinks = getContactLinksArray(links, options)

  if (!contactLinks?.length) return null

  return (
    <div
      className={cn('flex items-center gap-10 sm:gap-8 flex-wrap', className)}
    >
      {contactLinks?.map(([name, val]) => {
        return (
          <a
            key={name}
            href={val?.url}
            className='flex hover:opacity-90 transition'
          >
            <ContactIcon name={name} {...iconProps} />
          </a>
        )
      })}
    </div>
  )
}

export default ContactLinks
