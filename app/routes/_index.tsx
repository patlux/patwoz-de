import type { LoaderFunctionArgs } from '@remix-run/node'
import { BaseLayout } from '~/components/BaseLayout'
import { Footer } from '~/components/Footer'
import { Introduction } from '~/components/Introduction'
import { PageViewCounter } from '~/components/PageViewCounter'
import { trackPage } from '~/utils/trackPage.server'

export const loader = ({ request }: LoaderFunctionArgs) => {
  return trackPage(request)
}

function Index() {
  return (
    <BaseLayout footerCenterComponent={<PageViewCounter />}>
      <Introduction />

      <article className="prose lg:prose-lg mt-12">
        <h4>Freelancer</h4>
        <p>
          As a freelancer, I am open to new opportunities and projects and would
          be delighted to discuss how I can assist you, whether you are a
          startup aiming to develop a new product, an established business
          seeking to modernize your systems, or a non-profit organization facing
          a specific technology challenge.
        </p>

        <p>
          Contact me: <a href="mailto:hi@patwoz.de">hi@patwoz.de</a>
        </p>

        <h5 className="font-semibold">I worked for</h5>

        <div className="grid grid-col-2 sm:grid-cols-4 gap-4">
          <a
            href="https://www.sap.com/index.html"
            target="_blank"
            rel="noreferrer"
            className="h-24 flex flex-1 justify-center items-center border border-transparent hover:border-zinc-200"
          >
            <img
              alt="Logo of SAP"
              src="/company/sap.svg"
              width="80px"
              className="my-0"
            />
          </a>
          <a
            href="https://www.porsche.com/germany/"
            target="_blank"
            rel="noreferrer"
            className="h-24 flex flex-1 justify-center items-center border border-transparent hover:border-zinc-200"
          >
            <img
              alt="Logo of Porsche"
              src="/company/Porsche-Logo.wine.svg"
              width="100px"
              className="my-0"
            />
          </a>
          <a
            href="https://www.stroeer.de/"
            target="_blank"
            rel="noreferrer"
            className="h-24 relative py-4 sm:py0 flex flex-1 flex-col justify-center items-center border border-transparent hover:border-zinc-200"
          >
            <img
              className="my-0"
              alt="Logo of Ströer"
              src="/company/str-logo-white.svg"
              width="120px"
            />
            <img
              className="mt-2 mb-0"
              alt="Logo of t-online"
              src="/company/t-online-desktop.327ab976.svg"
              width="100px"
            />
          </a>
          <a
            href="https://www.abl.de/"
            target="_blank"
            rel="noreferrer"
            className="h-24 flex flex-1 justify-center items-center border border-transparent hover:border-zinc-200"
          >
            <img
              alt="Logo of ABL"
              src="/company/ABL_Logo.svg"
              className="my-0"
            />
          </a>
        </div>

        <h4>piparo.tech</h4>

        <p>
          Besides my freelancing, I'm working with two colleagues to build an IT
          service company (<a href="https://piparo.tech">piparo.tech</a>) where
          we bring our collective skills and experience to offer our clients
          tailored solutions that meet their needs and requirements.
        </p>
        <p>
          In addition to providing IT services to our clients, our company is
          also striving to develop our own products to bring to market. As a
          team of experienced developers, we are constantly exploring new ideas
          and identifying opportunities to create products that meet the needs
          of businesses and consumers alike.
        </p>
        <p>
          Contact us: <a href="mailto:info@piparo.tech">info@piparo.tech</a>
        </p>
      </article>

      <Footer>
        <PageViewCounter />
      </Footer>
    </BaseLayout>
  )
}

export default Index
