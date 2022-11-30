import type { LoaderFunction } from '@remix-run/node';
import { redirect } from '@remix-run/node';

export const loader: LoaderFunction = async () => {
  return redirect('https://de.linkedin.com/in/patrick-wozniak-696453123');
};
