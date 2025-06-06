import { RefObject, useCallback, useEffect, useRef, useState } from 'react'

export type UseIntersectionOptions = IntersectionObserverInit & {
  /** If `true`, visibility will be continuously updated. When `false` will only update once. @default false  */
  repeat?: boolean
}

export const useIntersection = (
  options: UseIntersectionOptions,
): [RefObject<HTMLDivElement | null>, boolean] => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const { repeat = false } = options || {}

  const callBack: IntersectionObserverCallback = useCallback(
    (entries) => {
      const [entry] = entries
      if (repeat) {
        setIsVisible(!!entry?.isIntersecting)
      } else if (entry?.isIntersecting) {
        setIsVisible(true)
      }
    },
    [repeat, setIsVisible],
  )

  useEffect(() => {
    const container = containerRef?.current
    const observer = new IntersectionObserver(callBack, options)
    if (container) observer.observe(container)

    return () => {
      if (container) {
        observer.unobserve(container)
      }
    }
  }, [containerRef, options, callBack])

  return [containerRef, isVisible]
}
