import type { LoaderArgs } from '@remix-run/node'
import { json } from '@remix-run/node'
import { z } from 'zod'
import { db, formatDateLikeDb } from '~/utils/db.server'
import { getAllPageViewHistory } from '~/utils/pageViewsHistory.server'
import { subtractDays } from '~/utils/query-helpers'
import { getParams } from '~/utils/search-params-helper'

export const SearchParamsSchema = z.object({
  query: z.string().max(50).optional(),
  days: z
    .string()
    .transform((v) => parseInt(v, 10))
    .optional(),
  before: z.string().optional(),
  after: z.string().optional(),
  'has-referrer': z
    .string()
    .transform((v) => v === 'true')
    .optional(),
  referrer: z.string().optional(),
  'user-agent': z.string().optional(),
})

export const loader = ({ request }: LoaderArgs) => {
  const pageViewHistory = getAllPageViewHistory(db)

  const url = new URL(request.url)
  const resultSearchParams = getParams(url.searchParams, SearchParamsSchema)
  if (!resultSearchParams.success) {
    throw json(
      { ok: false, errorType: 'error', errors: resultSearchParams.errors },
      { status: 400 }
    )
  }

  const searchParams = resultSearchParams.data

  const timestamp =
    searchParams.days != null ? formatDateLikeDb(subtractDays(searchParams.days)) : null

  return json({
    data: pageViewHistory.filter((pageView) => {
      if (timestamp && pageView.timestamp < timestamp) {
        return false
      }

      if (searchParams.before && pageView.timestamp > searchParams.before) {
        return false
      }

      if (searchParams.after && pageView.timestamp > searchParams.after) {
        return false
      }

      if (searchParams['has-referrer'] === true && pageView.referrer == null) {
        return false
      }

      if (
        searchParams['user-agent'] != null &&
        !pageView.useragent.includes(searchParams['user-agent'])
      ) {
        return false
      }

      if (
        searchParams['referrer'] != null &&
        !pageView.useragent.includes(searchParams['referrer'])
      ) {
        return false
      }

      return true
    }),
  })
}
