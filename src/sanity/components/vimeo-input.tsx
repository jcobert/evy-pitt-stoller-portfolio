import { TrashIcon } from '@sanity/icons/Trash'
import { Box, Button, Card, Flex, Stack, TextInput } from '@sanity/ui'
import { useCallback, useState } from 'react'
import { ObjectInputProps, set, unset } from 'sanity'

export const VimeoInput = (props: ObjectInputProps) => {
  const { value, onChange } = props
  const [loading, setLoading] = useState(false)

  // Extract URL or ID from existing value for the text input
  const [inputValue, setInputValue] = useState(
    (value?.url as string) || (value?.id as string) || '',
  )

  const handleFetch = async () => {
    if (!inputValue) return
    const id =
      inputValue.match(/(?:vimeo\.com\/|video\/)(\d+)/)?.[1] || inputValue

    setLoading(true)
    try {
      const res = await fetch(`https://vimeo.com/api/v2/video/${id}.json`)
      const data = await res.json()
      const video = data[0]

      // Save the fetched data into the Sanity object
      onChange(
        set({
          _type: 'vimeoVideo',
          id: video.id.toString(),
          url: video.url,
          title: video.title,
          thumbnailUrl: video.thumbnail_large,
        }),
      )
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error('Failed to fetch Vimeo metadata:', err)
    } finally {
      setLoading(false)
    }
  }

  // Clear the field data entirely
  const handleClear = useCallback(() => {
    setInputValue('')
    onChange(unset())
  }, [onChange])

  return (
    <Stack gap={3}>
      <Flex gap={2}>
        <Box flex={1}>
          <TextInput
            value={inputValue}
            onChange={(e) => setInputValue(e.currentTarget.value)}
            placeholder='https://vimeo.com/12345'
          />
        </Box>
        <Button
          mode='ghost'
          onClick={handleFetch}
          loading={loading}
          text='Submit'
          disabled={!inputValue}
        />
        {/* Show the clear button if there is saved data or typed input */}
        {value || inputValue ? (
          <Button
            mode='ghost'
            tone='critical'
            icon={TrashIcon}
            onClick={handleClear}
            text='Clear'
          />
        ) : null}
      </Flex>

      {value?.thumbnailUrl && (
        <Card padding={2} shadow={1} radius={2}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={value.thumbnailUrl as string}
            alt='Vimeo preview'
            style={{ width: '100%', height: 'auto', borderRadius: '4px' }}
          />
        </Card>
      )}
    </Stack>
  )
}
