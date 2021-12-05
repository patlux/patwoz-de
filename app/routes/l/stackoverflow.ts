import type { LoaderFunction } from 'remix';
import { redirect } from 'remix';

export const loader: LoaderFunction = async () => {
  return redirect('https://stackoverflow.com/users/6300994/patrick-wozniak?tab=profile');
};
