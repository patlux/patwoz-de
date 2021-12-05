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
        <a className="no-underline font-bold text-black text-center" href="/">
          <img src="/patwoz-logo-transparent-800px.png" alt="Logo of patwoz.de" width="125px" />
          <span className="sr-only">Patrick Wozniak</span>
        </a>
        <div className="flex flex-1 md:justify-end mt-2 md:mt-0">
          <a className="button font-black" href="/l/cv">
            📄 <span className="underline">cv</span>
          </a>
          <a className="button font-black ml-2" href="/l/mailto">
            📨 <span className="underline">mail</span>
          </a>
        </div>
      </nav>
      <main>
        <p className="flow-root">
          <img
            className="float-left mr-4 rounded-full shadow-xl"
            src="/me.jpg"
            width="128"
            height="128"
            alt="Face picture of Patrick Wozniak"
          />
          <p className="mb-2">Hi, I’m</p>
          <h3 className="font-black mb-2 text-lg">Patrick Wozniak</h3>
          <p>Software Engineer</p>
        </p>

        <article className="prose mt-12">
          <p>
            Passionate software developer since the age of 16. Experienced frontend engineer with
            deep knowledge in JavaScript/TypeScript and React (Native).
          </p>

          <h2 id="stack">🏆 tech-stack</h2>

          <div className="flex space-x-4">
            <span className="inline-block px-4 py-2 bg-blue-900 text-white shadow-md rounded">
              typescript
            </span>
            <span className="inline-block px-4 py-2 bg-blue-200 text-blue-700 shadow-md rounded">
              reactjs
            </span>
            <span className="inline-block px-4 py-2 bg-green-800 text-green-100 shadow-md rounded">
              nodejs
            </span>
            <span className="inline-block px-4 py-2 bg-yellow-300 text-yellow-900 shadow-md rounded">
              aws
            </span>
          </div>

          <h2 id="links">🔗 links</h2>

          <p>
            <a href="/l/stackoverflow">stack overflow</a> · <a href="/l/twitter">twitter</a> ·{' '}
            <a href="/l/linkedin">linkedin</a> · <a href="/l/xing">xing</a> ·{' '}
            <a href="/l/thingiverse">thingiverse</a>
          </p>
          <h2 id="built">👨‍🏭️ built</h2>
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
          <h2 id="uses">👏 uses</h2>
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
      <div role="separator" className="mt-12 mb-6 w-full h-px bg-gray-200" />
      <footer className="text-sm text-gray-500">
        © {new Date().getFullYear()} Patrick Wozniak. All rights reserved.
      </footer>
    </>
  );
}

export default Index;
