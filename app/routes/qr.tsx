import type { LoaderFunctionArgs, MetaFunction } from '@remix-run/node';
import { Form, useLoaderData } from '@remix-run/react';
import { BaseLayout } from '~/components/BaseLayout';
import { Introduction } from '~/components/Introduction';
import { PageViewCounter } from '~/components/PageViewCounter';
import bwip from 'bwip-js';
import clsx from 'clsx';
import barcode from '~/utils/barcode.server';

export const meta: MetaFunction = () => {
  return [
    {
      title: 'QR Code Generator | Patrick Wozniak',
    },
  ];
};

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  const text = url.searchParams.get('text');
  const codetype = url.searchParams.get('codetype');

  if (text == null) {
    return null;
  }

  const imageBase64 = (
    codetype === 'code128'
      ? Buffer.from(barcode.to_png(20, barcode.create_code128(text)))
      : await bwip.toBuffer({
          bcid: codetype ?? 'qrcode',
          text,
          scale: 8,
          includetext: true,
          textxalign: 'center',
        })
  ).toString('base64');

  return { text: text.toString(), codetype: codetype ?? 'qr', imageBase64 };
};

export default function QrCodeGeneratorRoute() {
  const data = useLoaderData<typeof loader>();

  return (
    <BaseLayout footerCenterComponent={<PageViewCounter />}>
      <Introduction />
      <hr className="mt-8 mb-4" />

      <div className="max-w-md mx-auto bg-white rounded-lg overflow-hidden">
        <div className="md:flex">
          <div className="w-full p-4">
            <Form reloadDocument method="get" className="mb-4">
              <h1 className="font-bold text-center text-2xl">Code Generator</h1>
              <p className="text-zinc-600 text-center">
                <a
                  href="https://bun.sh"
                  className="hover:underline"
                  target="_blank"
                >
                  bun.sh (typescript)
                </a>{' '}
                {'↔'}{' '}
                <a
                  href="https://webassembly.org/"
                  className="hover:underline"
                  target="_blank"
                >
                  webassembly
                </a>{' '}
                {'↔'}{' '}
                <a
                  href="https://www.rust-lang.org/"
                  className="hover:underline"
                  target="_blank"
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
                  defaultChecked={
                    data?.codetype == null || data?.codetype === 'qrcode'
                  }
                />
                <label htmlFor="codetype-qr" className="pl-2 pr-4">
                  QR
                </label>
                <input
                  type="radio"
                  id="codetype-code128"
                  name="codetype"
                  value="code128"
                  defaultChecked={data?.codetype === 'code128'}
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
                  defaultValue={data?.text ?? ''}
                />
              </div>
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full"
              >
                Generate
              </button>
            </Form>
            {data?.imageBase64 && (
              <div
                id="qrCode"
                className={clsx(
                  'flex items-center justify-center',
                  'w-full',
                  'border-zinc-200 border rounded-xl',
                  data.codetype === 'code128'
                    ? 'aspect-video'
                    : 'aspect-square',
                )}
              >
                <img
                  alt="QR Code"
                  src={`data:image/png;base64, ${data.imageBase64}`}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </BaseLayout>
  );
}
