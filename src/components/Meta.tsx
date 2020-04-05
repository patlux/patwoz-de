import Head from 'next/head';

export default function Meta() {
  return (
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="theme-color" content="#000000" />
      <meta name="description" content="Patrick Wozniak's personal website"></meta>
      <meta name="robots" content="index,follow" />
      <meta name="googlebot" content="index,follow" />
      <meta name="geo.region" content="DE" />
      <meta name="geo.placename" content="Nuremberg" />
      <link rel="me" href="mailto:email@patwoz.de"></link>

      <meta name="twitter:card" content="summary" />
      <meta name="twitter:site" content="@de_patwoz" />
      <meta name="twitter:creator" content="@de_patwoz" />
      <meta name="twitter:url" content="https://patwoz.de/" />
      <meta name="twitter:title" content="Patrick Wozniak's personal website" />
      <meta name="twitter:image" content="https://patwoz.de/beauty-512.png" />
      <meta name="twitter:image:alt" content="Face photo of Patrick Wozniak" />
    </Head>
  );
}
