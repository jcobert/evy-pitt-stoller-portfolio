/* eslint-disable @next/next/no-img-element */
import { ImageResponse } from 'next/og'

import { getSanityImageUrl } from '@/utils/media'
import { getFullName } from '@/utils/string'
import { cn } from '@/utils/style'

import { getProfile } from '@/sanity/lib/fetch'

export const runtime = 'edge'

const loadGoogleFont = async (font: string) => {
  const url = `https://fonts.googleapis.com/css2?family=${font}`
  const css = await (await fetch(url)).text()
  const resource = css.match(/src: url\((.+)\) format\('(opentype|truetype)'\)/)

  if (resource?.[1]) {
    const response = await fetch(resource[1])
    if (response.status == 200) {
      return await response.arrayBuffer()
    }
  }

  throw new Error('failed to load font data')
}

const loadContent = async () => {
  const { firstName, lastName, titles, photo } = (await getProfile()) || {}
  const fullname = getFullName(firstName, lastName)
  const imageUrl = getSanityImageUrl(photo, { format: 'png' })
  const headline = titles?.join(' | ')

  return {
    fullname,
    headline,
    photo: {
      url: imageUrl,
      dimensions: photo?.asset?.metadata?.dimensions,
      alt: photo?.asset?.altText,
    },
  }
}

export const GET = async (request: Request) => {
  try {
    const { searchParams } = new URL(request?.url)

    // const profile = await loadContent()

    const [profile, fontDisplay, fontBody] = await Promise.all([
      loadContent(),
      loadGoogleFont('Bodoni+Moda'),
      loadGoogleFont('Inter'),
    ])

    // Dynamic data
    const title = searchParams?.get('title')?.slice(0, 100) || ''
    const subtitle = searchParams?.get('subtitle')?.slice(0, 100) || ''
    const imgUrl = searchParams?.get('url') || ''
    const imgAlt = searchParams?.get('alt') || ''
    const imgWidth = searchParams?.get('width') || ''
    const imgHeight = searchParams?.get('height') || ''

    const base = (
      <div
        style={{
          // backgroundColor: '#FDFDFF',
          // backgroundColor: '#f4efea',
          // backgroundImage:
          //   'linear-gradient(to bottom right, #d7c4b9, #c98a92)',
          // backgroundImage: 'linear-gradient(to bottom right, #c98a92, #874b57)',
          // height: '100%',
          // width: '100%',
          display: 'flex',
          textAlign: 'center',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          flexWrap: 'nowrap',
          // gap: '12px'
        }}
      >
        {/* Dynamic image */}
        {imgUrl ? (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              justifyItems: 'center',
            }}
          >
            <img
              alt={imgAlt}
              width={imgWidth}
              height={imgHeight}
              src={imgUrl}
              style={{
                backgroundSize: 'contain',
              }}
            />
          </div>
        ) : null}

        {/* Profile photo */}
        {/* {profile?.photo ? (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                justifyItems: 'center',
                // width: '200px',
              }}
            >
              <img
                alt={profile?.photo?.alt}
                src={profile?.photo?.url}
                width={(profile?.photo?.dimensions?.width || 0) / 4}
                height={(profile?.photo?.dimensions?.height || 0) / 4}
                style={{
                  objectFit: 'contain',
                }}
              />
            </div>
          ) : null} */}

        {/* Logo */}
        <div
          style={{
            backgroundColor: '#fcf9f7',
          }}
          tw={cn(
            'w-32 h-32 border border-primary/50',
            'flex items-center justify-center',
          )}
        >
          <div
            style={{
              backgroundColor: '#874b57',
            }}
            tw='flex-auto h-18 w-full flex justify-center items-center text-5xl -mx-3 pt-px text-center text-white font-display'
          >
            EPS
          </div>
        </div>

        {/* Separator */}
        <div
          style={{
            height: '1px',
            width: '40%',
            border: '1px solid #c98a92',
            borderRadius: '4px',
            marginTop: '48px',
          }}
        />

        {/* Name */}
        <div
          style={{
            padding: '24px 0 0 0',
            fontSize: '80px',
            // color: '#c98a92',
            backgroundImage:
              'linear-gradient(to bottom right, #f4efea 50%, #c98a92)',
            // backgroundImage:
            //   'linear-gradient(to bottom right, #874b57, #c98a92)',
            backgroundClip: 'text',
            color: 'transparent',
            // fontWeight: 'bold',
            // width: '100%',
          }}
        >
          {profile?.fullname || 'Evy Pitt-Stoller'}
        </div>

        {/* Headline */}
        {profile?.headline ? (
          <div
            style={{
              fontFamily: 'inter',
              fontSize: '28px',
              color: '#fcf9f7',
              opacity: 0.7,
            }}
            tw='text-3xl mt-4'
          >
            {profile?.headline}
          </div>
        ) : null}

        {/* Separator */}
        {title ? (
          <div
            style={{
              height: '1px',
              width: '40%',
              border: '1px solid #c98a92',
              borderRadius: '4px',
              marginTop: '48px',
            }}
          />
        ) : null}

        {/* Title */}
        {title ? (
          <div
            style={{
              fontSize: 36,
              fontStyle: 'normal',
              letterSpacing: '-0.025em',
              marginTop: 64,
              padding: '0 120px',
              lineHeight: 1.4,
              whiteSpace: 'pre-wrap',
              // backgroundImage:
              //   'linear-gradient(to bottom right, #874b57, #c98a92)',
              // backgroundClip: 'text',
              // color: 'transparent',
              // color: '#c98a92',
              // color: '#3a0711',
              // color: '#874b57',
              fontFamily: 'inter',
            }}
            tw='text-white opacity-85'
          >
            {title}
          </div>
        ) : null}
        {subtitle ? <div>{subtitle}</div> : null}
      </div>
    )

    return new ImageResponse(
      (
        <div
          style={{
            // backgroundImage:
            //   'linear-gradient(to bottom right, #c98a92, #874b57)',
            backgroundImage:
              'linear-gradient(to bottom right, #d7c4b9, #c98a92)',
          }}
          tw='flex items-end h-full w-full'
        >
          {/* Profile photo */}
          {profile?.photo ? (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                justifyItems: 'center',
              }}
            >
              <img
                alt={profile?.photo?.alt}
                src={profile?.photo?.url}
                width={(profile?.photo?.dimensions?.width || 0) * 0.75}
                height={(profile?.photo?.dimensions?.height || 0) * 0.75}
                style={{
                  objectFit: 'contain',
                }}
              />
            </div>
          ) : null}
          <div
            style={{
              backgroundImage:
                'linear-gradient(to bottom right, #c98a92, #874b57)',
            }}
            tw='flex items-center justify-center flex-auto h-full'
          >
            {base}
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
        fonts: [
          {
            name: 'bodoni-moda',
            data: fontDisplay,
            style: 'normal',
            weight: 600,
          },
          {
            name: 'inter',
            data: fontBody,
            style: 'normal',
            weight: 400,
          },
        ],
      },
    )
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (e: any) {
    // eslint-disable-next-line no-console
    console.log(`${e}`)
    return new Response(`Failed to generate the image`, {
      status: 500,
    })
  }
}
