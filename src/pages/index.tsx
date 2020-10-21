import React from 'react';
import { NextPage } from 'next';
import Head from 'next/head';

import Meta from '../components/Meta';

export interface Props {
  listOfAddresses?: Contact[];
}

export interface Contact {
  link: string;
  description: string;
}

const INITIAL_LIST_OF_ADDRESSES: Contact[] = [
  {
    link: 'mailto:email@patwoz.de',
    description: 'mail',
  },
  {
    link: 'https://github.com/patlux',
    description: 'github',
  },
  {
    link: 'https://stackoverflow.com/users/6300994/patrick-wozniak',
    description: 'stackoverflow',
  },
  {
    link: 'https://twitter.com/de_patwoz',
    description: 'twitter',
  },
];

const IndexPage: NextPage<Props> = ({ listOfAddresses = INITIAL_LIST_OF_ADDRESSES }) => (
  <div className="container">
    <Meta />
    <Head>
      <title>Patrick Wozniak</title>
    </Head>
    <main>
      <span>Hi, I'm</span>
      <h1>
        Patrick Wozniak{' '}
        <a className="link-inherit" href="/beauty-512.png" title="Open image of Patrick Wozniak">
          <img
            src="/beauty-34.png"
            alt="Face photo of Patrick Wozniak"
            width="34"
            height="34"
          ></img>
        </a>
      </h1>
      <h3>Software Engineer in Nuremberg</h3>
      <ul className="contact-list">
        {listOfAddresses.map((Address) => (
          <li key={Address.link}>
            <a href={Address.link}>{Address.description}</a>
          </li>
        ))}
      </ul>
      <p>
        I live in Nuremberg with my lovely girlfriend. I build amazing stuff at{' '}
        <a rel="noreferrer noopener" href="https://finanzguru.de/" target="_blank">
          Finanzguru
        </a>
        . When it comes to building things, I like to move rapidly. I utilize technologies such as{' '}
        <a rel="noreferrer noopener" href="https://reactjs.org/" target="_blank">
          React
        </a>{' '}
        (
        <a
          rel="noreferrer noopener"
          href="https://facebook.github.io/react-native/"
          target="_blank"
        >
          Native
        </a>
        ),{' '}
        <a rel="noreferrer noopener" href="https://nextjs.org/" target="_blank">
          Next.js
        </a>
        ,{' '}
        <a rel="noreferrer noopener" href="https://vercel.com/" target="_blank">
          Vercel
        </a>
        ,{' '}
        <a rel="noreferrer noopener" href="https://expo.io/snacks/@patwoz" target="_blank">
          Expo
        </a>
        ,{' '}
        <a
          rel="noreferrer noopener"
          href="https://about.gitlab.com/product/continuous-integration/"
          target="_blank"
        >
          Gitlab Ci
        </a>
        .
      </p>
    </main>
  </div>
);

export default IndexPage;
