import TopNavigation from '../components/TopNavigation';

interface Props {
  title: string;
  url: string;
  children: unknown;
}

function BaseLayout({ title, url, children }: Props) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>{title}</title>
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="stylesheet" href="/style/global.css" />
      </head>
      <body className="bg-gray-50 font-mono pt-12 pb-24 px-4 md:px-12 md:container md:mx-auto antialiased">
        <TopNavigation url={url} />

        {children}

        <footer className="text-sm text-gray-500 mt-20">
          <br />© 2021 Patrick Wozniak. All rights reserved.
        </footer>
      </body>
    </html>
  );
}

export default BaseLayout;
