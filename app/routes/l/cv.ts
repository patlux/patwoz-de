import type { LoaderFunction } from '@remix-run/node';
import { redirect } from '@remix-run/node';

export const loader: LoaderFunction = async () => {
  return redirect('https://stackoverflow.com/users/story/6300994?view=Cv');
};
