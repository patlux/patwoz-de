import type { LoaderArgs, V2_MetaFunction } from '@remix-run/node'
import { BaseLayout } from '~/components/BaseLayout'
import { PageViewCounter } from '~/components/PageViewCounter'
import { getPageViewsForPath, increasePageViewsForPath } from '~/utils/pageViews.server'
import { addingPageViewHistory } from '~/utils/pageViewsHistory.server'

export const meta: V2_MetaFunction = () => {
  return [
    {
      title: 'Imprint',
    },
  ]
}

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

function Imprint() {
  return (
    <BaseLayout footerCenterComponent={<PageViewCounter />}>
      <br />
      <br />
      <br />
      <h1>Imprint</h1>
      <br />
      <p>
        <strong>Responsible for this website:</strong>
        <br />
        Patrick Wozniak
        <br />
        c/o AutorenServices.de
        <br />
        Birkenallee 24
        <br />
        36037 Fulda
        <br />
      </p>
    </BaseLayout>
  )
}

export default Imprint
