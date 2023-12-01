import type { LoaderFunctionArgs, MetaFunction } from '@remix-run/node';
import { BaseLayout } from '~/components/BaseLayout';
import { Footer } from '~/components/Footer';
import { Introduction } from '~/components/Introduction';
import { PageViewCounter } from '~/components/PageViewCounter';
import { trackPage } from '~/utils/trackPage.server';

export const meta: MetaFunction = () => {
  return [
    {
      title: 'What I Use | Patrick Wozniak',
    },
  ];
};

export const loader = ({ request }: LoaderFunctionArgs) => {
  return trackPage(request);
};

const WhatIUseRoute = () => {
  return (
    <BaseLayout footerCenterComponent={<PageViewCounter />}>
      <Introduction />

      <article className="prose lg:prose-lg mt-12 prose-h1:text-3xl">
        <h1>👏 What I Use</h1>
        <ul>
          <li>
            <a href="https://mailinabox.email">mailinabox</a>: Running a self
            hosted <strong>mail server</strong> on a{' '}
            <a href="https://www.ovhcloud.com/de/vps/">5€ vps</a>
          </li>
          <li>
            <a href="https://miniflux.app">miniflux</a>: Running a self hosted{' '}
            <strong>rss server</strong> on a{' '}
            <a href="https://vserver.site/de/vserver_kvm_frankfurt.html">
              3€ vps
            </a>
          </li>
          <li>
            <a href="https://docs.hyperion-project.org">hyperion</a>: DIY
            version of “Philips Hue” on my tv (
            <a href="https://www.youtube.com/watch?v=W870SRqGd_o">
              📹 See my video
            </a>
            )
          </li>
          <li>
            <a href="https://www.home-assistant.io">Home Assistant</a>: Home
            Automation Tool to control my smart home devices in my home
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
  );
};

export default WhatIUseRoute;
