import type { LoaderFunctionArgs, MetaFunction } from '@remix-run/node';
import { BaseLayout } from '~/components/BaseLayout';
import { PageViewCounter } from '~/components/PageViewCounter';
import { trackPage } from '~/utils/trackPage.server';

export const meta: MetaFunction = () => {
  return [
    {
      title: 'Imprint',
    },
  ];
};

export const loader = ({ request }: LoaderFunctionArgs) => {
  return trackPage(request);
};

function Imprint() {
  return (
    <BaseLayout footerCenterComponent={<PageViewCounter />}>
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
