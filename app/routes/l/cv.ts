import type { LoaderFunction } from '@remix-run/node';
import { redirect } from '@remix-run/node';

export const loader: LoaderFunction = async () => {
  return redirect(
    'https://www.freelance.de/Freiberufler/215868-Senior-TypeScript-Developer-ReactJS-React-Native/highlight=react'
  );
};
