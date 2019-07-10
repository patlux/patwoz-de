import React from 'react';
import { NextPage } from 'next';

export interface Contact {
  link: string;
  description: string;
}

export interface Props {
  listOfAddresses: Contact[];
}

const INITIAL_LIST_OF_ADDRESSES: Contact[] = [
  {
    link: 'mailto:email@patwoz.de',
    description: 'email@patwoz.de',
  },
  {
    link: 'https://twitter.com/de_patwoz',
    description: 'Twitter: @de_patwoz',
  },
  {
    link: 'https://github.com/patlux',
    description: 'Github: patlux',
  },
  {
    link: 'https://stackoverflow.com/users/6300994/patrick-wozniak',
    description: ' Stack Overflow',
  },
];

const IndexPage: NextPage<Props> = ({
  listOfAddresses = INITIAL_LIST_OF_ADDRESSES,
}) => (
  <>
    <h1>Hi, I'm Patrick Wozniak</h1>
    <p>
      I live in Nuremberg with my lovely girlfriend. I build amazing stuff at{' '}
      <a href="https://www.cegeka.com/">Cegeka Deutschland GmbH</a>. When it
      comes to building things, I like to move rapidly. I utilize technologies
      such as <a href="https://reactjs.org/">React</a> (
      <a href="https://facebook.github.io/react-native/">Native</a>
      ), <a href="https://expo.io/snacks/@patwoz">Expo</a>,{' '}
      <a href="https://zeit.co/now">Now</a>,{' '}
      <a href="https://about.gitlab.com/product/continuous-integration/">
        Gitlab Ci
      </a>
      .
    </p>
    <p>You can find me on the internet at:</p>
    <ul>
      {listOfAddresses.map(Address => (
        <li key={Address.link}>
          <a href={Address.link}>{Address.description}</a>
        </li>
      ))}
    </ul>
  </>
);

export default IndexPage;
