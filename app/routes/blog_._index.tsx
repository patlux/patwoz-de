import { json } from '@remix-run/node'
import { Link, useLoaderData } from '@remix-run/react'

import { getPosts } from '~/.server/posts'
import { BaseLayout } from '~/components/BaseLayout'

export const loader = async () => json(await getPosts())

export default function Component() {
  const posts = useLoaderData<typeof loader>()

  return (
    <BaseLayout>
      <ul className="space-y-8">
        {posts.map((post) => (
          <li key={post.slug}>
            <article className="prose lg:prose-lg space-y-2">
              <Link to={`/blog/${post.slug}`}>
                <h3 className="text-3xl font-bold">{post.frontmatter.title}</h3>
              </Link>
              <p className="text-gray-600">{post.frontmatter.description}</p>
              <time
                className="block text-sm text-cyan-700"
                dateTime={post.frontmatter.published}
              >
                {post.frontmatter.published.replace(/-/g, '/')}
              </time>
            </article>
          </li>
        ))}
      </ul>
    </BaseLayout>
  )
}
