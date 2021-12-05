import type { LoaderFunction } from 'remix';
import { redirect } from 'remix';

export const loader: LoaderFunction = async () => {
  return redirect('https://de.linkedin.com/in/patrick-wozniak-696453123');
};
