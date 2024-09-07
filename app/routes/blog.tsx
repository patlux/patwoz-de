import { Outlet } from '@remix-run/react'
import { BaseLayout } from '~/components/BaseLayout'

export default function Component() {
  return (
    <BaseLayout>
      <article className="prose">
        <Outlet />
      </article>
    </BaseLayout>
  )
}
