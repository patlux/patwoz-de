import React from 'react';
import { Link } from 'gatsby';

import Layout from '../components/layout';
import Image from '../components/image';
import SEO from '../components/seo';
import pkg from '../../package.json';

const IndexPage = () => (
  <Layout>
    <SEO title="Home" keywords={pkg.keywords} />
    <h1>Hi, I'm Patrick Wozniak</h1>
    <p>
      I live in Nuremberg with my lovely girlfriend. I build amazing stuff at{' '}
      <a rel="noopener noreferrer" target="_blank" href="https://www.cegeka.com/">
        Cegeka Deutschland GmbH
      </a>
      . When it comes to building things, I like to move rapidly. I utilize technologies such as
      <a rel="noopener noreferrer" target="_blank" href="https://reactjs.org/">
        React
      </a>{' '}
      (
      <a rel="noopener noreferrer" target="_blank" href="https://facebook.github.io/react-native/">
        Native
      </a>
      ),{' '}
      <a rel="noopener noreferrer" target="_blank" href="https://expo.io/snacks/@patwoz">
        Expo
      </a>
      ,{' '}
      <a rel="noopener noreferrer" target="_blank" href="https://zeit.co/now">
        Now
      </a>
      .
    </p>
    <p>You can find me on the internet at:</p>
    <ul>
      <li>
        <a rel="noopener noreferrer" target="_blank" href="mailto:email@patwoz.de">
          email@patwoz.de
        </a>
      </li>
      <li>
        <a rel="noopener noreferrer" target="_blank" href="https://twitter.com/de_patwoz">
          @de_patwoz
        </a>
      </li>
    </ul>
    <Link to="/page-2/">Go to page 2</Link>
  </Layout>
);

export default IndexPage;
