import React from 'react';

import Layout from '../components/layout';
import SEO from '../components/seo';
import LinkExternal from '../components/LinkExternal';
import pkg from '../../package.json';

const IndexPage = () => (
  <Layout>
    <SEO title="Home" keywords={pkg.keywords} />
    <h1>Hi, I'm Patrick Wozniak</h1>
    <p>
      I live in Nuremberg with my lovely girlfriend. I build amazing stuff at{' '}
      <LinkExternal href="https://www.cegeka.com/">Cegeka Deutschland GmbH</LinkExternal>. When it
      comes to building things, I like to move rapidly. I utilize technologies such as{' '}
      <LinkExternal href="https://reactjs.org/">React</LinkExternal> (
      <LinkExternal href="https://facebook.github.io/react-native/">Native</LinkExternal>
      ), <LinkExternal href="https://expo.io/snacks/@patwoz">Expo</LinkExternal>,{' '}
      <LinkExternal href="https://zeit.co/now">Now</LinkExternal>.
    </p>
    <p>You can find me on the internet at:</p>
    <ul>
      <li>
        <LinkExternal href="mailto:email@patwoz.de">email@patwoz.de</LinkExternal>
      </li>
      <li>
        <LinkExternal href="https://twitter.com/de_patwoz">@de_patwoz</LinkExternal>
      </li>
    </ul>
  </Layout>
);

export default IndexPage;
