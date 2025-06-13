import { StarFilledIcon } from '@sanity/icons'
import { BooleanFieldProps } from 'sanity'

export const FeaturedBooleanField = (props: BooleanFieldProps) => {
  return (
    <div className='flex gap-4 items-center'>
      <div className='flex-auto'>{props?.renderDefault(props)}</div>

      {props?.value ? (
        <StarFilledIcon className='text-3xl flex-none text-amber-400' />
      ) : null}
    </div>
  )
}
