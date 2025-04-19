import { Link, useLoaderData } from '@remix-run/react'

import { getPosts } from '~/.server/posts'
import { BaseLayout } from '~/components/BaseLayout'
import { Introduction } from '~/components/Introduction'

export const loader = async () => await getPosts()

const dateFormatter = new Intl.DateTimeFormat('en-GB', {
  dateStyle: 'medium',
})

export default function Component() {
  const posts = useLoaderData<typeof loader>()

  return (
    <BaseLayout>
      <Introduction />
      <hr className="mt-8" />
      <ul className="space-y-8 mt-8">
        {posts.map((post) => (
          <li key={post.slug}>
            <article className="prose lg:prose-lg prose-a:no-underline prose-headings:my-0">
              <Link
                to={`/blog/${post.slug}`}
                className="flex flex-col-reverse sm:flex-row gap-x-6 sm:items-center group"
              >
                <time
                  className="block text-base font-mono text-cyan-700 no-underline w-36 whitespace-nowrap"
                  dateTime={post.frontmatter.published}
                >
                  {dateFormatter.format(new Date(post.frontmatter.published))}
                </time>
                <h3 className="text-base font-bold prose:mt-0 m:mb-0 w-full group-hover:underline">
                  {post.frontmatter.title}
                </h3>
              </Link>
            </article>
          </li>
        ))}
      </ul>
    </BaseLayout>
  )
}
