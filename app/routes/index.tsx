import type { MetaFunction } from 'remix';

export const meta: MetaFunction = () => {
  return {
    title: 'Patrick Wozniak: Software Engineer',
    description: 'Patrick Wozniak is a self-taught Software Engineer from Erlangen, Germany.',
  };
};

function Index() {
  return (
    <>
      <nav className="flex flex-col md:flex-row items-center space-x-4 mb-12">
        <a className="no-underline font-bold text-black" href="/">
          Patrick Wozniak
        </a>
        <div className="flex space-x-4">
          <span className="text-gray-400">(</span>
          <a className="no-underline " href="/l/cv">
            cv
          </a>
          <span className="text-gray-400">//</span>
          <a className="no-underline " href="/l/mailto">
            mail
          </a>
          <span className="text-gray-400">)</span>
        </div>
      </nav>
      <main>
        <article className="prose">
          <img
            className="md:float-left mr-4 rounded-sm"
            src="/me.jpg"
            width="128"
            height="128"
            alt="Face picture of Patrick Wozniak"
          />
          <p>Hi, I’m</p>
          <h3 id="patrick-wozniak">Patrick Wozniak</h3>
          <p>Software Engineer</p>
          <br />
          <p>
            Passionate software developer since the age of 16. Experienced frontend engineer with
            deep knowledge in JavaScript/TypeScript and React (Native).
          </p>
          <h2 id="links">links</h2>

          <p>
            <a href="/l/stackoverflow">stack overflow</a> · <a href="/l/twitter">twitter</a> ·{' '}
            <a href="/l/linkedin">linkedin</a> · <a href="/l/xing">xing</a> ·{' '}
            <a href="/l/thingiverse">thingiverse</a>
          </p>
          <h2 id="built">built</h2>
          <ul>
            <li>
              <a href="https://github.com/patlux/expo-cli-docker-images">expo-cli-docker-images</a>:
              🐳 Docker images for expo-cli
            </li>
            <li>
              <a href="https://github.com/patlux/react-native-bluetooth-state-manager">
                react-native-bluetooth-state-manager
              </a>
              : Manage the bluetooth state of your device
            </li>
            <li>
              <a href="https://github.com/patlux/react-native-app-state">react-native-app-state</a>:
              A declarative way to use react-native’s AppState
            </li>
            <li>
              <a href="https://github.com/patlux/node-cec">node-cec</a>: cec-client wrapper in
              nodejs
            </li>
            <li>
              <a href="https://github.com/patlux/dotfiles">dotfiles</a>: 👨🏻‍💻 dotfiles for my personal
              macos setup
            </li>
            <li>
              <a href="https://github.com/patlux/react-supercluster">react-supercluster</a>: 🗺 react
              hook for mapbox’s supercluster library
            </li>
            <li>
              <a href="https://github.com/patlux/patwoz-de">patwoz-de</a>: 👨🏻‍💻 my personal website
            </li>
            <li>
              <a href="https://github.com/patlux/prettier-config">prettier-config</a>: 💄My personal
              Prettier config
            </li>
          </ul>
          <h2 id="uses">uses</h2>
          <ul>
            <li>
              <a href="https://mailinabox.email">mailinabox</a>: Running a self hosted{' '}
              <strong>mail server</strong> on a{' '}
              <a href="https://www.ovhcloud.com/de/vps/">5€ vps</a>
            </li>
            <li>
              <a href="https://miniflux.app">miniflux</a>: Running a self hosted{' '}
              <strong>rss server</strong> on a{' '}
              <a href="https://vserver.site/de/vserver_kvm_frankfurt.html">3€ vps</a>
            </li>
            <li>
              <a href="https://docs.hyperion-project.org">hyperion</a>: DIY version of “Philips Hue”
              on my tv (<a href="https://www.youtube.com/watch?v=W870SRqGd_o">📹 See my video</a>)
            </li>
            <li>
              <a href="https://www.home-assistant.io">Home Assistant</a>: Home Automation Tool to
              control my smart home devices in my home
            </li>
            <li>
              <a href="https://www.anycubic.com/products/anycubic-i3-mega-s">
                ANYCUBIC I3 Mega S 3D Printer
              </a>
              : To print 3d stuff
            </li>
          </ul>
        </article>
      </main>
      <footer className="text-sm text-gray-500 mt-20">
        <br />© {new Date().getFullYear()} Patrick Wozniak. All rights reserved.
      </footer>
    </>
  );
}

export default Index;
