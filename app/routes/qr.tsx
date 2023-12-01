import type { LoaderFunctionArgs, MetaFunction } from '@remix-run/node';
import { Form, useLoaderData } from '@remix-run/react';
import { BaseLayout } from '~/components/BaseLayout';
import { Introduction } from '~/components/Introduction';
import { PageViewCounter } from '~/components/PageViewCounter';
import qrcode from 'qrcode';
import invariant from '~/utils/invariant';

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

  invariant(text, 'Missing data');

  const qrCodeImageUrl = (
    await qrcode.toBuffer(text.toString(), {
      type: 'png',
      scale: 8,
    })
  ).toString('base64');
  return { text: text.toString(), qrCodeImageUrl };
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
              <h1 className="font-bold text-center text-2xl mb-4">
                QR Code Generator
              </h1>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
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
            {data?.qrCodeImageUrl && (
              <div id="qrCode" className="flex justify-center">
                <img
                  className="w-full aspect-square"
                  alt="QR Code"
                  src={`data:image/png;base64, ${data.qrCodeImageUrl}`}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </BaseLayout>
  );
}
