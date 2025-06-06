/* eslint-disable @next/next/no-img-element */
import { ImageResponse } from 'next/og'

import { cn } from '@/utils/style'

import { siteConfig } from '@/configuration/site'

export const runtime = 'edge'

async function loadGoogleFont(font: string) {
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

export const GET = async (request: Request) => {
  try {
    const { searchParams } = new URL(request?.url)

    // Base logo image
    // const logoData = await fetch(
    //   new URL(
    //     `${process.env.NEXT_PUBLIC_SITE_BASE_URL}/jc-website-logo.png`,
    //     import.meta.url,
    //   ),
    // ).then((res) => res?.arrayBuffer())

    // if (!Object.keys(logoData)?.length) {
    //   // eslint-disable-next-line no-console
    //   console.error('Image not found.')
    //   return Response.json({}, { status: 404 })
    // }

    // Dynamic data
    const title = searchParams?.get('title')?.slice(0, 100) || ''
    const subtitle = searchParams?.get('subtitle')?.slice(0, 100) || ''
    const imgUrl = searchParams?.get('url') || ''
    const imgAlt = searchParams?.get('alt') || ''
    const imgWidth = searchParams?.get('width') || ''
    const imgHeight = searchParams?.get('height') || ''

    return new ImageResponse(
      (
        <div
          style={{
            // backgroundColor: '#FDFDFF',
            // backgroundColor: '#f4efea',
            backgroundImage:
              'linear-gradient(to bottom right, #c98a92, #874b57)',
            // backgroundImage:
            //   'linear-gradient(to bottom right, #d7c4b9, #c98a92)',
            height: '100%',
            width: '100%',
            display: 'flex',
            textAlign: 'center',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            flexWrap: 'nowrap',
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

          {/* Logo */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              justifyItems: 'center',
            }}
          >
            {/* <img
              alt={siteConfig?.title}
              src={logoData as unknown as string}
              style={{ width: '20%' }}
            /> */}
          </div>

          {/* Logo */}
          <div
            style={{
              // width: '48px',
              // height: '48px',
              backgroundColor: '#fcf9f7',
              // border:
              //   '1px solid border-color: color-mix(in oklab, var(--primary) 50%, transparent);',
              // display: 'flex',
              // alignItems: 'center',
              // justifyContent: 'center',
            }}
            tw={cn(
              'w-24 h-24 bg-primary-light border border-primary/50',
              'flex items-center justify-center',
            )}
          >
            <div
              style={{
                // flex: 'auto',
                // marginInline: '-4px',
                backgroundColor: '#874b57',
                // paddingTop: '1px',
                // textAlign: 'center',
                // color: 'white',
                // fontFamily: 'var(--font-bodoni-moda)',
              }}
              tw='flex-auto h-12 w-full flex justify-center items-center text-3xl -mx-2 bg-secondary pt-px text-center text-white font-display'
            >
              EPS
            </div>
          </div>

          <div
            style={{
              padding: '24px 0 0 0',
              fontSize: '64px',
              // color: '#c98a92',
              backgroundImage:
                'linear-gradient(to bottom right, #f4efea 60%, #c98a92)',
              // backgroundImage:
              //   'linear-gradient(to bottom right, #874b57, #c98a92)',
              backgroundClip: 'text',
              color: 'transparent',
              // fontWeight: 'bold',
              // width: '100%',
            }}
          >
            Evy Pitt-Stoller
          </div>

          <div
            style={{
              height: '1px',
              width: '20%',
              border: '1px solid #d7c4b9',
              borderRadius: '4px',
              marginTop: '36px',
            }}
          />

          {/* Title */}
          {title ? (
            <div
              style={{
                fontSize: 48,
                fontStyle: 'normal',
                letterSpacing: '-0.025em',
                marginTop: 24,
                padding: '0 120px',
                lineHeight: 1.4,
                whiteSpace: 'pre-wrap',
                // backgroundImage:
                //   'linear-gradient(to bottom right, #874b57, #c98a92)',
                // backgroundClip: 'text',
                // color: 'transparent',
                // color: '#c98a92',
                // color: '#3a0711',
                color: '#874b57',
                fontFamily: 'inter',
              }}
            >
              {title}
            </div>
          ) : null}
          {subtitle ? <div>{subtitle}</div> : null}
        </div>
      ),
      {
        width: 1200,
        height: 630,
        fonts: [
          {
            name: 'bodoni-moda',
            data: await loadGoogleFont('Bodoni+Moda'),
            style: 'normal',
            weight: 600,
          },
          {
            name: 'inter',
            data: await loadGoogleFont('Inter'),
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
