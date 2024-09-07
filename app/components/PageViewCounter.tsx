import { useLoaderData } from '@remix-run/react'

export const PageViewCounter = () => {
  const loaderData = useLoaderData<{ count?: number } | undefined>()

  if (loaderData?.count == null) {
    return null
  }

  return <span className="flex-1 text-center">Views: {loaderData.count}</span>
}
