import type { LoaderFunction } from 'remix';
import { redirect } from 'remix';

export const loader: LoaderFunction = async () => {
  return redirect('https://stackoverflow.com/users/story/6300994?view=Cv');
};
