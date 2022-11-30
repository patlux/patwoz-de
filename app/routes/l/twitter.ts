import type { LoaderFunction } from '@remix-run/node';
import { redirect } from '@remix-run/node';

export const loader: LoaderFunction = async () => {
  return redirect('https://twitter.com/de_patwoz');
};
