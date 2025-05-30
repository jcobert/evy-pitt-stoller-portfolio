import { Rule } from '@sanity/types'
import { Text, TextArea } from '@sanity/ui'
import { FormEvent, useCallback } from 'react'
import { StringFieldProps, TextInputProps, set, unset } from 'sanity'

export const RequiredIndicator = <span className='text-red-500'>*</span>

export const SanityTextInput = (
  props: TextInputProps & { characterLimit?: number },
) => {
  const {
    // elementProps,
    renderDefault,
    // onChange,
    value,
    characterLimit = 185,
  } = props

  // const handleChange = useCallback(
  //   (e: FormEvent<HTMLInputElement>) => {
  //     const nextValue = e.currentTarget?.value
  //     onChange(nextValue ? set(nextValue) : unset())
  //   },
  //   [onChange],
  // )

  const count = value?.length || 0

  // const validationRules = (props?.schemaType?.validation ||
  //   []) as unknown as Rule[]

  // const isRequired = validationRules?.some((rule) => rule._required)

  return (
    <div className='flex flex-col gap-4'>
      {/* <TextInput
        {...elementProps}
        onChange={handleChange}
        value={value}
        // style={{ backgroundColor: isRequired ? '#f76d5f' : 'inherit' }}
      /> */}
      {renderDefault(props)}
      <Text
        className='self-end'
        style={{
          color: count > characterLimit ? 'red' : 'inherit',
          fontSize: '0.75rem',
        }}
      >{`${count} / ${characterLimit} characters`}</Text>
    </div>
  )
}

export const SanityTextAreaInput = (
  props: TextInputProps & { characterLimit?: number },
) => {
  const { elementProps, onChange, value, characterLimit } = props

  const handleChange = useCallback(
    (e: FormEvent<HTMLTextAreaElement>) => {
      const nextValue = e.currentTarget?.value
      onChange(nextValue ? set(nextValue) : unset())
    },
    [onChange],
  )

  const count = characterLimit ? value?.length || 0 : 0

  const validationRules = (props?.schemaType?.validation ||
    []) as unknown as Rule[]

  const isRequired = validationRules?.some((rule) => rule.isRequired())

  return (
    <div className='flex flex-col gap-4'>
      <TextArea
        {...elementProps}
        onChange={handleChange}
        value={value}
        style={{ backgroundColor: isRequired ? '#f76d5f' : 'inherit' }}
      />

      {characterLimit ? (
        <Text
          className='self-end'
          style={{
            color: count > characterLimit ? 'red' : 'inherit',
            fontSize: '0.75rem',
          }}
        >{`${count} / ${characterLimit} characters`}</Text>
      ) : null}
    </div>
  )
}

export const SanityTextField = (props: StringFieldProps) => {
  const validationRules = (props?.schemaType?.validation ||
    []) as unknown as Rule[]

  const isRequired = validationRules?.some((rule) => rule.isRequired())

  return (
    <div className='flex gap-1'>
      {isRequired ? <span className='text-red-500'>*</span> : null}
      <div className='flex-auto'>{props?.renderDefault(props)}</div>
    </div>
  )
}
