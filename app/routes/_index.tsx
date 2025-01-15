import clsx from 'clsx'
import { type ComponentProps } from 'react'
import { BaseLayout } from '~/components/BaseLayout'
import { Footer } from '~/components/Footer'
import { Introduction } from '~/components/Introduction'

function Index() {
  return (
    <BaseLayout>
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
          <Company
            href="https://www.sap.com/index.html"
            aria-label="Go to website of sap"
          >
            <img alt="Logo of SAP" src="/company/sap.svg" width="80px" />
          </Company>
          <Company
            href="https://www.porsche.com/germany/"
            aria-label="Go to website of porsche"
          >
            <img
              alt="Logo of Porsche"
              src="/company/Porsche-Logo.wine.svg"
              width="100px"
            />
          </Company>
          <Company
            href="https://www.stroeer.de/"
            aria-label="Go to website of stroeer"
          >
            <img
              alt="Logo of Ströer"
              src="/company/str-logo-white.svg"
              width="120px"
            />
            <img
              className="mt-2"
              alt="Logo of t-online, a part of Ströer"
              src="/company/t-online-desktop.327ab976.svg"
              width="100px"
            />
          </Company>
          <Company href="https://www.abl.de/" aria-label="Go to website of abl">
            <img alt="Logo of ABL" src="/company/ABL_Logo.svg" />
          </Company>
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

      <Footer />
    </BaseLayout>
  )
}

type CompanyProps = ComponentProps<'a'> & {}

const Company = ({ className, ...aProps }: CompanyProps) => {
  return (
    // eslint-disable-next-line jsx-a11y/anchor-has-content
    <a
      target="_blank"
      rel="noreferrer"
      {...aProps}
      className={clsx(
        className,
        'h-24 not-prose flex flex-1 flex-col justify-center items-center border border-transparent hover:border-zinc-200',
      )}
    />
  )
}

export default Index
