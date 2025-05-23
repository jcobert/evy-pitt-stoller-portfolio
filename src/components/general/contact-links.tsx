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

import { cn } from '@/utils/style'

export enum SocialNetworks {
  instagram = 'Instagram',
  facebook = 'Facebook',
  twitter = 'Twitter',
  linkedIn = 'LinkedIn',
  pinterest = 'Pinterest',
  tiktok = 'TikTok',
}

export type ContactLinkMap = {
  [x in keyof typeof SocialNetworks | 'email' | 'phone']?: string
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

const ContactLinks: FC<Props> = ({ links = {}, className }) => {
  const contactLinks = Object.entries(links) as [keyof typeof links, string][]

  if (!contactLinks?.length) return null

  return (
    <div className={cn('flex items-center gap-10', className)}>
      {contactLinks?.map(([name, url]) => {
        const Icon = contactIcons?.[name]
        return (
          <a key={name} href={url}>
            <div className='rounded-full bg-purple inline-block p-2'>
              <Icon className='text-white text-2xl' />
            </div>
          </a>
        )
      })}
    </div>
  )
}

export default ContactLinks
