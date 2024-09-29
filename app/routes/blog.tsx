import { Outlet } from '@remix-run/react'
import { BaseLayout } from '~/components/BaseLayout'
import { Footer } from '~/components/Footer'

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
