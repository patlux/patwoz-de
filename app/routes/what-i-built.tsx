import type { LoaderArgs, V2_MetaFunction } from '@remix-run/node';
import { BaseLayout } from '~/components/BaseLayout';
import { Footer } from '~/components/Footer';
import { Introduction } from '~/components/Introduction';
import { PageViewCounter } from '~/components/PageViewCounter';
import { trackPage } from '~/utils/trackPage.server';

export const meta: V2_MetaFunction = () => {
  return [
    {
      title: 'What I Built | Patrick Wozniak',
    },
  ];
};

export const loader = ({ request }: LoaderArgs) => {
  return trackPage(request);
};

const WhatIBuildRoute = () => {
  return (
    <BaseLayout footerCenterComponent={<PageViewCounter />}>
      <Introduction />

      <article className="prose lg:prose-lg mt-12 prose-h1:text-3xl">
        <h1>👨‍🏭️ What I Built</h1>
        <ul>
          <li>
            <a href="https://github.com/patlux/expo-cli-docker-images">
              expo-cli-docker-images
            </a>
            : 🐳 Docker images for expo-cli
          </li>
          <li>
            <a href="https://github.com/patlux/react-native-bluetooth-state-manager">
              react-native-bluetooth-state-manager
            </a>
            : Manage the bluetooth state of your device
          </li>
          <li>
            <a href="https://github.com/patlux/react-native-app-state">
              react-native-app-state
            </a>
            : A declarative way to use react-native’s AppState
          </li>
          <li>
            <a href="https://github.com/patlux/node-cec">node-cec</a>:
            cec-client wrapper in nodejs
          </li>
          <li>
            <a href="https://github.com/patlux/dotfiles">dotfiles</a>: 👨🏻‍💻
            dotfiles for my personal macos setup
          </li>
          <li>
            <a href="https://github.com/patlux/react-supercluster">
              react-supercluster
            </a>
            : 🗺 react hook for mapbox’s supercluster library
          </li>
          <li>
            <a href="https://github.com/patlux/patwoz-de">patwoz-de</a>: 👨🏻‍💻 my
            personal website
          </li>
          <li>
            <a href="https://github.com/patlux/prettier-config">
              prettier-config
            </a>
            : 💄My personal Prettier config
          </li>
        </ul>
      </article>

      <Footer>
        <PageViewCounter />
      </Footer>
    </BaseLayout>
  );
};

export default WhatIBuildRoute;
