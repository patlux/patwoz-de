import * as React from 'react';

interface Props {
  children: React.ReactNode;
}

function Head({ children }: Props) {
  return (
    <head>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <link rel="stylesheet" href="/style/global.css" />
      <meta
        name="description"
        content="Patrick Wozniak is a self-taught Software Engineer from Nuremberg, Germany."
      />
      {children}
    </head>
  );
}

export default Head;
