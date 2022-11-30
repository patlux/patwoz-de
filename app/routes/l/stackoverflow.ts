import type { LoaderFunction } from '@remix-run/node';
import { redirect } from '@remix-run/node';

export const loader: LoaderFunction = async () => {
  return redirect('https://stackoverflow.com/users/6300994/patrick-wozniak?tab=profile');
};
