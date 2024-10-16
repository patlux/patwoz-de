import { Outlet } from '@remix-run/react'
import { BaseLayout } from '~/components/BaseLayout'
import { Footer } from '~/components/Footer'

export default function Component() {
  return (
    <BaseLayout>
      <article className="prose font-article max-w-full text-lg text-black leading-8 prose-h1:text-2xl">
        <Outlet />
      </article>
      <Footer />
    </BaseLayout>
  )
}
