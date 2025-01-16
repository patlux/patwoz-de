import type { MetaFunction } from '@remix-run/cloudflare'
import { Form, useSearchParams } from '@remix-run/react'
import { BaseLayout } from '~/components/BaseLayout'
import { Introduction } from '~/components/Introduction'
import bwip from 'bwip-js'
import clsx from 'clsx'
import { useEffect } from 'react'

export const meta: MetaFunction = () => {
  return [
    {
      title: 'QR Code Generator | Patrick Wozniak',
    },
  ]
}

type CodeType = 'qrcode' | 'code128'

const CANVAS_ID = 'my-canvas'

export default function QrCodeGeneratorRoute() {
  const [searchParams] = useSearchParams()
  const text = searchParams.get('text')
  const codetype = searchParams.get('codetype') ?? ('qrcode' as CodeType)

  useEffect(() => {
    if (text == null || text.trim().length === 0) {
      return
    }

    bwip.toCanvas(CANVAS_ID, {
      bcid: codetype,
      text: text,
      scale: 8,
      includetext: true,
      textxalign: 'center',
    })

    const canvas = document.getElementById(CANVAS_ID)
    if (canvas) {
      canvas.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
  }, [text, codetype])

  useEffect(() => {
    // if the user submits again without changing anything
    if (text) {
      const canvas = document.getElementById(CANVAS_ID)
      if (canvas) {
        canvas.scrollIntoView({ behavior: 'smooth', block: 'center' })
      }
    }
  })

  return (
    <BaseLayout>
      <Introduction />
      <hr className="mt-8 mb-4" />

      <div className="max-w-md mx-auto bg-white rounded-lg overflow-hidden">
        <div className="md:flex">
          <div className="w-full p-4">
            <Form method="GET" className="mb-4">
              <h1 className="font-bold text-center text-2xl">Code Generator</h1>
              <p className="text-zinc-600 text-center">
                <a
                  href="https://bun.sh"
                  className="hover:underline"
                  target="_blank"
                  rel="noreferrer"
                >
                  bun.sh (typescript)
                </a>{' '}
                {'↔'}{' '}
                <a
                  href="https://webassembly.org/"
                  className="hover:underline"
                  target="_blank"
                  rel="noreferrer"
                >
                  webassembly
                </a>{' '}
                {'↔'}{' '}
                <a
                  href="https://www.rust-lang.org/"
                  className="hover:underline"
                  target="_blank"
                  rel="noreferrer"
                >
                  rust
                </a>
              </p>
              <p className="text-zinc-600 text-center mt-2">
                This demonstrates the usage of a compiled rust library into
                webassembly to be embedded into a node/bun server.
              </p>
              <div className="mt-8 mb-4">
                <input
                  type="radio"
                  id="codetype-qr"
                  name="codetype"
                  value="qrcode"
                  defaultChecked={codetype == null || codetype === 'qrcode'}
                />
                <label htmlFor="codetype-qr" className="pl-2 pr-4">
                  QR
                </label>
                <input
                  type="radio"
                  id="codetype-code128"
                  name="codetype"
                  value="code128"
                  defaultChecked={codetype === 'code128'}
                />
                <label htmlFor="codetype-code128" className="pl-2 pr-4">
                  Code128
                </label>
                <label
                  className="mt-4 block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="url"
                >
                  Enter URL or Text
                </label>
                <input
                  name="text"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="url"
                  type="text"
                  placeholder="https://example.com"
                  defaultValue={text ?? ''}
                />
              </div>
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full"
              >
                Generate
              </button>
            </Form>
            <div className="w-full flex flex-nowrap justify-center">
              <canvas
                id={CANVAS_ID}
                className={clsx(
                  codetype === 'qrcode' && 'w-full aspect-square',
                  codetype === 'code128' && 'w-40 h-32',
                )}
              />
            </div>
          </div>
        </div>
      </div>
    </BaseLayout>
  )
}
