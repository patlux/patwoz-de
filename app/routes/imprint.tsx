import type { MetaFunction } from '@remix-run/node';
import { Link } from '@remix-run/react';
import { BaseLayout } from '~/components/BaseLayout';

export const meta: MetaFunction = () => {
  return {
    title: 'Imprint',
  };
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
