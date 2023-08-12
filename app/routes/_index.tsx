import type { LoaderArgs } from '@remix-run/node';
import { BaseLayout } from '~/components/BaseLayout';
import { Footer } from '~/components/Footer';
import { Introduction } from '~/components/Introduction';
import { PageViewCounter } from '~/components/PageViewCounter';
import { trackPage } from '~/utils/trackPage.server';

export const loader = ({ request }: LoaderArgs) => {
  return trackPage(request);
};

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
  );
}

export default Index;
