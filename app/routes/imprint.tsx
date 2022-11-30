import { Link } from '@remix-run/react';

function Imprint() {
  return (
    <>
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
    </>
  );
}

export default Imprint;
