import React from 'react';
import Document, { Head, Main, NextScript } from 'next/document';

import { TRACKING_ID } from '../env';

export default class extends Document {
  render() {
    return (
      <html>
        <Head>
          {TRACKING_ID && (
            <script
              async
              defer
              data-website-id={TRACKING_ID}
              src="https://aly.patwoz.de/umami.js"
            ></script>
          )}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}
