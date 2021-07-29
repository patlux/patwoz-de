import * as React from 'react';
import type { ReactNode } from 'react';
import TopNavigation from '../components/TopNavigation';

interface Props {
  children: ReactNode;
}

function BaseLayout({ children }: Props) {
  return (
    <body className="bg-gray-50 font-mono pt-12 pb-24 px-4 md:px-12 md:container md:mx-auto antialiased">
      <TopNavigation />

      {children}

      <footer className="text-sm text-gray-500 mt-20">
        <br />© 2021 Patrick Wozniak. All rights reserved.
      </footer>
    </body>
  );
}

export default BaseLayout;
