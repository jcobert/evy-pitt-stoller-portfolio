'use client'

import Link from 'next/link'
import { FC } from 'react'

import { cn } from '@/utils/style'

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu'

import { useNavigationMenu } from '@/hooks/use-navigation-menu'

import { NAVIGATION_ITEMS } from '@/configuration/nav'

type Props = {
  className?: string
}

// Exclude home link
const NAV_ITEMS = NAVIGATION_ITEMS?.slice(1)

const DesktopNav: FC<Props> = ({ className }) => {
  const { isActiveItem, isActivePath, handleLinkClick } = useNavigationMenu()

  return (
    <NavigationMenu className={className}>
      <NavigationMenuList className='gap-6'>
        {NAV_ITEMS?.map((item) => {
          const hasMenu = !!item?.menu?.links?.length
          const isActive = isActiveItem(item)

          if (hasMenu)
            return (
              <NavigationMenuItem key={item?.id}>
                <NavigationMenuTrigger
                  className={cn(
                    'font-medium text-primary-foreground hover:text-primary-foreground',
                    'transition-colors bg-transparent hover:bg-white/20 focus:bg-white/20',
                    'data-[state=open]:bg-white/60 data-[state=open]:hover:bg-white/60 data-[state=open]:hover:text-primary-foreground',
                    isActive &&
                      'font-semibold text-secondary hover:text-secondary focus:text-secondary bg-secondary-light/5 hover:bg-secondary-light/5 data-[state=open]:text-secondary data-[state=open]:hover:text-secondary',
                  )}
                >
                  {item?.name}
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className='grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]'>
                    {item?.menu?.img?.src ? (
                      <li className='row-span-3'>
                        <NavigationMenuLink
                          asChild
                          onClick={(e) => handleLinkClick(e, item?.url)}
                        >
                          <Link
                            href={item?.url}
                            className='flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md'
                          >
                            {/* eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text */}
                            <img {...item?.menu?.img} />
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    ) : null}
                    {item?.menu?.links?.map((menuItem) => {
                      const isActiveMenuItem = isActivePath(menuItem?.url)
                      return (
                        <li key={menuItem?.id}>
                          <NavigationMenuLink
                            asChild
                            onClick={(e) => handleLinkClick(e, menuItem?.url)}
                          >
                            <Link
                              href={menuItem?.url}
                              className={cn(
                                'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
                              )}
                            >
                              <div
                                className={cn(
                                  'text-sm font-medium leading-none text-primary-foreground',
                                  isActiveMenuItem &&
                                    'font-semibold text-secondary',
                                )}
                              >
                                {menuItem?.name}
                              </div>
                              {menuItem?.description ? (
                                <p className='line-clamp-2 text-sm leading-snug text-muted-foreground'>
                                  {menuItem?.description}
                                </p>
                              ) : null}
                            </Link>
                          </NavigationMenuLink>
                        </li>
                      )
                    })}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            )

          return (
            <NavigationMenuItem key={item?.id}>
              <NavigationMenuLink
                asChild
                className={navigationMenuTriggerStyle({
                  className: cn(
                    'bg-transparent hover:bg-white/20 focus:bg-white/20 transition font-medium text-primary-foreground hover:text-primary-foreground',
                    isActive &&
                      'font-semibold text-secondary hover:text-secondary focus:text-secondary bg-secondary-light/5 hover:bg-secondary-light/5',
                  ),
                })}
                onClick={(e) => handleLinkClick(e, item?.url)}
              >
                <Link href={item?.url}>{item?.name}</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          )
        })}
      </NavigationMenuList>
    </NavigationMenu>
  )
}

export default DesktopNav
