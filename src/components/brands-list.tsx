import { FC } from 'react'

import { getSanityImageUrl } from '@/utils/media'
import { cn } from '@/utils/style'

import { PROFILE_QUERYResult } from '@/sanity/types/generated/types'

type Brand = NonNullable<NonNullable<PROFILE_QUERYResult>['companies']>[number]

type Props = {
  brands: Brand[] | null | undefined
  className?: string
  imageClassName?: string
}

const BrandLogo: FC<{ brand: Brand; className?: string }> = ({
  brand,
  className,
}) => {
  const src = getSanityImageUrl(brand?.logo, {
    // ratio: 'square',
    crop: 'center',
    width: 80,
  })
  if (!src) return null
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      key={brand?.name}
      src={src}
      alt={brand?.name}
      className={cn(
        'rounded-full__ object-center object-contain max-w-16 p-2__ border__',
        className,
      )}
    />
  )
}

const BrandsList: FC<Props> = ({ brands, className, imageClassName }) => {
  if (!brands?.length) return null

  return (
    <div
      className={cn(
        'px-4',
        // 'gap-1 sm:gap-2 items-center grid grid-flow-col-dense grid-rows-2 sm:grid-rows-1',
        'flex items-center justify-around',
        className,
      )}
    >
      {brands?.map((brand) => (
        <BrandLogo key={brand?._key} brand={brand} className={imageClassName} />
      ))}
    </div>
  )
}

export default BrandsList
