import type { LoaderArgs } from '@remix-run/node'
import { BaseLayout } from '~/components/BaseLayout'
import { Footer } from '~/components/Footer'
import { PageViewCounter } from '~/components/PageViewCounter'
import { getPageViewsForPath, increasePageViewsForPath } from '~/utils/pageViews.server'
import { addingPageViewHistory } from '~/utils/pageViewsHistory.server'

export const loader = ({ request }: LoaderArgs) => {
  const pathname = new URL(request.url).pathname

  increasePageViewsForPath(pathname)
  const count = getPageViewsForPath(pathname)

  addingPageViewHistory({
    path: pathname,
    useragent: request.headers.get('User-Agent') ?? `NO_USERAGENT`,
    referrer: request.headers.get('Referer') ?? null,
  })

  return { count }
}

function Index() {
  return (
    <BaseLayout footerCenterComponent={<PageViewCounter />}>
      <div className="flow-root">
        <img
          className="float-left mr-4 rounded-xl shadow-sm"
          src="/me.jpg"
          width="128"
          height="128"
          alt="Face of Patrick Wozniak"
        />
        <p className="my-2 text-xl">Hello 👋</p>
        <p className="text-slate-600">I’m</p>
        <h3 className="font-semibold text-xl">Patrick Wozniak</h3>
        <p className="text-slate-600">Software Engineer</p>
      </div>

      <article className="prose mt-12">
        <p>
          I'm a software developer who discovered my passion for coding at the age of 16, and since
          then, I've become an experienced frontend engineer with a strong focus on
          JavaScript/TypeScript and React (Native).
        </p>
        <p>
          Since I first delved into the world of software development, I've been constantly
          improving my skills and today I'm an experienced developer with extensive knowledge of the
          latest technologies and trends in my field. I enjoy working on challenging projects and
          strive to find innovative solutions to solve complex problems.
        </p>

        <h4>piparo.tech</h4>

        <p>
          Currently, I'm working with two colleagues to build an IT service company (
          <a href="https://piparo.tech">piparo.tech</a>) where we bring our collective skills and
          experience to offer our clients tailored solutions that meet their needs and requirements.
        </p>
        <p>
          In addition to providing IT services to our clients, our company is also striving to
          develop our own products to bring to market. As a team of experienced developers, we are
          constantly exploring new ideas and identifying opportunities to create products that meet
          the needs of businesses and consumers alike.
        </p>
        <p>
          Contact us: <a href="mailto:info@piparo.tech">info@piparo.tech</a>
        </p>

        <h4>Freelancer</h4>

        <p>
          In addition to my work as a software developer and my role in the IT service company, I
          also operate as a freelancer and am always open to new opportunities and projects. Whether
          you're a startup looking to develop a new product, an established business seeking to
          modernize your systems, or a nonprofit organization with a specific technology challenge,
          I would be happy to discuss how I can help.
        </p>
        <p>
          Contact me: <a href="mailto:hi@patwoz.de">hi@patwoz.de</a>
        </p>

        <h2 id="stack">🏆 tech-stack</h2>

        <div className="flow-root">
          <div className="-m-2">
            <span className="inline-block px-4 py-2 bg-blue-900 text-white shadow-md rounded m-2">
              typescript
            </span>
            <span className="inline-block px-4 py-2 bg-blue-200 text-blue-700 shadow-md rounded m-2">
              reactjs
            </span>
            <span className="inline-block px-4 py-2 bg-blue-200 text-blue-700 shadow-md rounded m-2">
              react-native
            </span>
            <span className="inline-block px-4 py-2 bg-green-800 text-green-100 shadow-md rounded m-2">
              nodejs
            </span>
            <span className="inline-block px-4 py-2 bg-yellow-300 text-yellow-900 shadow-md rounded m-2">
              aws
            </span>
          </div>
        </div>

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
            <a href="https://github.com/patlux/react-native-app-state">react-native-app-state</a>: A
            declarative way to use react-native’s AppState
          </li>
          <li>
            <a href="https://github.com/patlux/node-cec">node-cec</a>: cec-client wrapper in nodejs
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
            <strong>mail server</strong> on a <a href="https://www.ovhcloud.com/de/vps/">5€ vps</a>
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

      <Footer>
        <PageViewCounter />
      </Footer>
    </BaseLayout>
  )
}

export default Index
