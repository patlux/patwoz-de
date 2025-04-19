import { Link, Outlet } from '@remix-run/react'
import { BaseLayout } from '~/components/BaseLayout'
import { Footer } from '~/components/Footer'
import ArrowLeftIcon from '@heroicons/react/24/outline/ArrowLeftIcon'

export default function Component() {
  return (
    <BaseLayout>
      <LinkToAllBlogPosts />
      <article className="my-12 prose font-article max-w-full text-lg text-black leading-8">
        <Outlet />
      </article>
      <LinkToAllBlogPosts />
      <Footer />
    </BaseLayout>
  )
}

const LinkToAllBlogPosts = () => {
  return (
    <Link to="/blog" className="flex items-center gap-x-2 hover:underline">
      <ArrowLeftIcon className="w-4 h-4 inline-block" />
      All blog posts
    </Link>
  )
}
