import type { ComponentChildren } from 'preact';
import { h } from 'preact';

interface Props {
  title: string;
  children: ComponentChildren;
}

function BaseLayout({ title, children }: Props) {
  return (
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>{title}</title>
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="stylesheet" href="/style/global.css" />
      </head>
      <body class="pt-12 pb-24 px-4 md:px-12 md:container md:mx-auto">
        {children}

        <footer className="text-sm text-gray-500 mt-20">
          <br />© 2021 Patrick Wozniak. All rights reserved.
        </footer>
      </body>
    </html>
  );
}

export default BaseLayout;
