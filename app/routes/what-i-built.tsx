import type { MetaFunction } from '@remix-run/react'
import { BaseLayout } from '~/components/BaseLayout'
import { Footer } from '~/components/Footer'
import { Introduction } from '~/components/Introduction'

export const meta: MetaFunction = () => {
  return [
    {
      title: 'What I Built | Patrick Wozniak',
    },
  ]
}

const WhatIBuildRoute = () => {
  return (
    <BaseLayout>
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

      <Footer />
    </BaseLayout>
  )
}

export default WhatIBuildRoute
