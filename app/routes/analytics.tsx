import { useLoaderData } from '@remix-run/react'
import { BaseLayout } from '~/components/BaseLayout'
import { PageViewCounter } from '~/components/PageViewCounter'
import { formatDateLikeDb } from '~/utils/db.server'
import { getAllPageViewHistory } from '~/utils/pageViewsHistory.server'
import { subtractDays } from '~/utils/query-helpers'

export const loader = () => {
  const pageViews = getAllPageViewHistory()

  const now7daysStr = formatDateLikeDb(subtractDays(7))
  const now30daysStr = formatDateLikeDb(subtractDays(30))

  return {
    pageViews,
    pageViews7Days: pageViews.filter((pageView) => {
      return pageView.timestamp > now7daysStr
    }),
    pageViews30Days: pageViews.filter((pageView) => {
      return pageView.timestamp > now30daysStr
    }),
  }
}

export const AnalyticsPage = () => {
  const data = useLoaderData<typeof loader>()
  return (
    <BaseLayout footerCenterComponent={<PageViewCounter />}>
      <div>
        <h3 className="text-lg font-medium leading-6 text-gray-900">
          Overview
        </h3>
        <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
          <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
            <dt className="truncate text-sm font-medium text-gray-500">
              Total
            </dt>
            <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">
              {data.pageViews.length}
            </dd>
          </div>
          <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
            <dt className="truncate text-sm font-medium text-gray-500">
              Last 7 days
            </dt>
            <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">
              {data.pageViews7Days.length}
            </dd>
          </div>
          <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
            <dt className="truncate text-sm font-medium text-gray-500">
              Last 30 days
            </dt>
            <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">
              {data.pageViews30Days.length}
            </dd>
          </div>
        </dl>
      </div>
    </BaseLayout>
  )
}

export default AnalyticsPage
