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
      <body class="px-4 md:px-12 md:container md:mx-auto pt-12">{children}</body>
    </html>
  );
}

export default BaseLayout;
