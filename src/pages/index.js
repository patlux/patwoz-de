import React from 'react';
import { FaGithub, FaTwitter, FaEnvelope, FaStackOverflow } from 'react-icons/fa';

import Layout from '../components/layout';
import SEO from '../components/seo';
import LinkExternal from '../components/LinkExternal';
import pkg from '../../package.json';

const IndexPage = ({ listOfAddresses }) => (
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
      <LinkExternal href="https://zeit.co/now">Now</LinkExternal>,{' '}
      <LinkExternal href="https://about.gitlab.com/product/continuous-integration/">
        Gitlab Ci
      </LinkExternal>
      .
    </p>
    <p>You can find me on the internet at:</p>
    <ul>
      {listOfAddresses.map(Address => (
        <li key={Address.link}>
          <LinkExternal href={Address.link}>
            <Address.icon /> {Address.description}
          </LinkExternal>
        </li>
      ))}
    </ul>
  </Layout>
);

IndexPage.defaultProps = {
  listOfAddresses: [
    {
      link: 'mailto:email@patwoz.de',
      icon: FaEnvelope,
      description: 'email@patwoz.de',
    },
    {
      link: 'https://twitter.com/de_patwoz',
      icon: FaTwitter,
      description: 'Twitter: @de_patwoz',
    },
    {
      link: 'https://github.com/patlux',
      icon: FaGithub,
      description: 'Github: patlux',
    },
    {
      link: 'https://stackoverflow.com/users/6300994/patrick-wozniak',
      icon: FaStackOverflow,
      description: ' Stack Overflow',
    },
  ],
};

export default IndexPage;
