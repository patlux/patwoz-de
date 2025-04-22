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
        <h4>Freelance Work</h4>
        <p>
          As a freelancer, I’m open to new opportunities and projects. Whether
          you're a startup launching your first product, an established business
          modernizing your systems, or a non-profit tackling a tech challenge,
          I’d be happy to help bring your vision to life.
        </p>

        <p>
          Get in touch: <a href="mailto:hi@patwoz.de">hi@patwoz.de</a> 📬
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
            href="https://www.ibm.com/"
            aria-label="Go to website of IBM"
          >
            <img alt="Logo of IBM" src="/company/IBM_logo.svg" width="100px" />
          </Company>
          <Company
            href="https://www.stroeer.de/"
            aria-label="Go to website of stroeer"
          >
            <img
              alt="Logo of Ströer"
              src="/company/str-logo-white.svg"
              width="100px"
            />
            <img
              className="mt-2"
              alt="Logo of t-online, a part of Ströer"
              src="/company/t-online-desktop.327ab976.svg"
              width="80px"
            />
          </Company>
        </div>

        <h4>piparo.tech</h4>

        <p>
          Alongside two colleagues, I'm also growing{' '}
          <a href="https://piparo.tech">piparo.tech</a>, an IT service company
          dedicated to providing tailored solutions to our clients' specific
          technology needs. We combine our extensive industry experience to not
          only offer exceptional services but also develop innovative products
          designed to solve real-world problems.
        </p>
        <p>
          Contact us: <a href="mailto:info@piparo.tech">info@piparo.tech</a> 📬
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
