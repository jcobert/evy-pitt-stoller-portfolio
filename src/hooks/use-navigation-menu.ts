import { LinkProps } from 'next/link'
import { usePathname } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'

import { NavItem } from '@/utils/nav'

import { ButtonProps } from '@/components/ui/button'

export const useNavigationMenu = () => {
  const pathname = usePathname()

  const [isMenuOpen, setIsMenuOpen] = useState(false)

  // Close menu when new page is loaded.
  useEffect(() => {
    setIsMenuOpen(false)
  }, [pathname])

  /**
   * Returns whether provided path is the active path.
   * Dynamic routes are treated as a match.
   *
   * If you don't want to match dynamic routes, set `exact` option to `false`,
   * which will only return `true` for a strict match.
   *
   * E.g. `"/shop/pants"` (provided path) will match `"/shop/[item]"` (router pathname)
   */
  const isActivePath = useCallback(
    (path?: string, options?: { exact?: boolean }) => {
      if (path === '/' || options?.exact) return path === pathname

      const activePath = pathname

      // Filter out any dynamic routes, and focus only on base path.
      const dynamicRouteIndex = activePath?.indexOf('[')
      const staticPath = activePath?.slice(
        0,
        dynamicRouteIndex > 0 ? dynamicRouteIndex - 1 : undefined,
      )

      const pathParts = path?.split('/')?.filter((i) => i) || []
      const activePathParts = staticPath?.split('/')?.filter((i) => i) || []

      // Check if base path is a match.
      const isDynamicMatch =
        !!activePathParts?.length &&
        activePathParts?.map((p, i) => pathParts?.[i] === p)?.every(Boolean)

      return (!!path && staticPath?.startsWith(path)) || isDynamicMatch
    },
    [pathname],
  )

  /** Returns whether nav item (or one of it's inner menu links) contains the active path. */
  const isActiveItem = useCallback(
    (item: NavItem) => {
      return (
        isActivePath(item?.url) ||
        !!item?.menu?.links?.some((link) => isActivePath(link?.url))
      )
    },
    [isActivePath],
  )

  /** Handles actions like closing mobile menu and preventing nav if link is current path. */
  const handleLinkClick = useCallback(
    (
      e: Parameters<NonNullable<(LinkProps | ButtonProps)['onClick']>>['0'],
      path: Parameters<typeof isActivePath>['0'],
      options: { preventDefault?: boolean } = { preventDefault: true },
    ) => {
      if (isActivePath(path, { exact: true })) {
        if (options?.preventDefault) e.preventDefault()
        setIsMenuOpen(false)
      }
    },
    [isActivePath, setIsMenuOpen],
  )

  return {
    isActiveItem,
    isActivePath,
    isMenuOpen,
    setIsMenuOpen,
    handleLinkClick,
  }
}
