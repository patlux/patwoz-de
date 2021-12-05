import type { LoaderFunction } from 'remix';
import { redirect } from 'remix';

export const loader: LoaderFunction = async () => {
  return redirect('mailto:hi@patwoz.de');
};
