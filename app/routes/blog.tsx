import type { MetaFunction } from '@remix-run/node'
import { Outlet } from '@remix-run/react'
import { BaseLayout } from '~/components/BaseLayout'
import { Footer } from '~/components/Footer'

export const meta: MetaFunction = ({ data }) => {
  console.log({ data })
  return []
}

// export const loader = ({ request }: LoaderFunctionArgs) => {
//   console.log(request.url)
//   return null
// }

export default function Component() {
  return (
    <BaseLayout>
      <article className="prose">
        <Outlet />
      </article>
      <Footer />
    </BaseLayout>
  )
}
