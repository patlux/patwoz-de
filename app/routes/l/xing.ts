import type { LoaderFunction } from 'remix';
import { redirect } from 'remix';

export const loader: LoaderFunction = async () => {
  return redirect('https://www.xing.com/profile/Patrick_Wozniak5');
};
