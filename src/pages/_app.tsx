import React from 'react';
import { AppProps } from 'next/app';

import '../styles/index.css';

function App({ pageProps, Component }: AppProps) {
  return <Component {...pageProps} />;
}

export default App;
