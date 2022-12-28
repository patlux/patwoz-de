import type { LoaderArgs, MetaFunction } from '@remix-run/node';
import { Link } from '@remix-run/react';
import { BaseLayout } from '~/components/BaseLayout';
import { getPageViewsForPath, increasePageViewsForPath } from '~/utils/pageViews.server';

export const meta: MetaFunction = () => {
  return {
    title: 'Imprint',
  };
};

export const loader = ({ request }: LoaderArgs) => {
  const pathname = new URL(request.url).pathname;

  increasePageViewsForPath(pathname);
  const count = getPageViewsForPath(pathname);

  return { count };
};

function Imprint() {
  return (
    <BaseLayout>
      <Link to="/">« Back to my website</Link>
      <br />
      <br />
      <br />
      <h1>Imprint</h1>
      <br />
      <p>
        <strong>Responsible for this website:</strong>
        <br />
        Patrick Wozniak
        <br />
        c/o AutorenServices.de
        <br />
        Birkenallee 24
        <br />
        36037 Fulda
        <br />
      </p>
    </BaseLayout>
  );
}

export default Imprint;
