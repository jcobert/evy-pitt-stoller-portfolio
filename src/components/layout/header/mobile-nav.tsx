'use client'

import Link, { LinkProps } from 'next/link'
import { FC, forwardRef } from 'react'
import { HiOutlineMenu } from 'react-icons/hi'

import { NavItem } from '@/utils/nav'
import { cn } from '@/utils/style'

import ContactCta, { CONTACT_CTA_LINK } from '@/components/general/contact-cta'
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'

import { useNavigationMenu } from '@/hooks/use-navigation-menu'

import { NAVIGATION_ITEMS } from '@/configuration/nav'

const MenuItem = forwardRef<
  HTMLLIElement,
  {
    item: NavItem
    className?: string
    linkClassName?: string
    inner?: boolean
    active?: boolean
  } & Partial<Omit<LinkProps, 'className'>>
>(({ item, className, linkClassName, inner, active, ...linkProps }, ref) => {
  return (
    <NavigationMenuItem ref={ref} className={cn('w-full', className)}>
      <NavigationMenuLink
        asChild
        className={navigationMenuTriggerStyle({
          className: cn(
            'w-full items-start p-6 text-balance bg-transparent rounded-none',
            active &&
              'font-semibold bg-primary/25 hover:bg-primary/25 focus:bg-primary/50 text-secondary',
          ),
        })}
      >
        <Link
          href={item?.url}
          className={cn(
            inner && 'flex flex-row justify-start !items-center gap-2 pl-8',
            linkClassName,
          )}
          {...linkProps}
        >
          {item?.name}
        </Link>
      </NavigationMenuLink>
    </NavigationMenuItem>
  )
})

type Props = {
  className?: string
}

const MobileNav: FC<Props> = ({ className }) => {
  const { isMenuOpen, setIsMenuOpen, isActivePath, handleLinkClick } =
    useNavigationMenu()

  return (
    <div className={cn('flex w-fit', className)}>
      <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
        <SheetTrigger
          className='w-fit'
          onClick={() => {
            setIsMenuOpen(true)
          }}
        >
          <HiOutlineMenu className='text-4xl text-secondary' />
        </SheetTrigger>
        <SheetContent className='backdrop-blur-lg bg-background/90 pb-safe'>
          <SheetHeader className='border-b-2'>
            <SheetTitle className='text-muted-foreground'>Menu</SheetTitle>
            <SheetDescription className='sr-only'>
              Navigation menu
            </SheetDescription>
          </SheetHeader>

          <NavigationMenu className='w-full self-end items-start justify-end max-w-none block overflow-auto pb-16'>
            <NavigationMenuList className='gap-4 flex-col items-end w-full'>
              {NAVIGATION_ITEMS?.map((item) => {
                const hasMenu = !!item?.menu?.links?.length
                if (hasMenu)
                  return (
                    <div
                      key={item?.id}
                      className='flex flex-col gap-4 items-end w-full'
                    >
                      <div className='flex flex-col gap-2 items-end w-full'>
                        {/* <MenuItem item={item} /> */}
                        <div className='w-full font-medium text-sm text-balance px-6 text-muted-foreground'>
                          <span className='w-full'>{item?.name}</span>
                        </div>

                        <ul className='flex flex-col gap-4 items-end w-full'>
                          {item?.menu?.links?.map((menuItem) => (
                            <MenuItem
                              key={menuItem?.id}
                              item={menuItem}
                              inner
                              active={isActivePath(menuItem?.url)}
                              onClick={(e) => handleLinkClick(e, menuItem?.url)}
                            />
                          ))}
                        </ul>
                      </div>

                      <div className='border-b border-border/50 w-full h-px' />
                    </div>
                  )
                return (
                  <div
                    key={item?.id}
                    className='flex flex-col gap-4 items-end w-full'
                  >
                    <MenuItem
                      item={item}
                      active={isActivePath(item?.url)}
                      onClick={(e) => handleLinkClick(e, item?.url)}
                    />
                    <div className='border-b border-border/50 w-full h-px' />
                  </div>
                )
              })}
            </NavigationMenuList>
          </NavigationMenu>

          <div className='flex justify-center items-center w-full py-6 bg-accent'>
            <ContactCta
              className='self-center'
              size='lg'
              onClick={(e) =>
                handleLinkClick(e, CONTACT_CTA_LINK, { preventDefault: false })
              }
            />
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}

export default MobileNav
