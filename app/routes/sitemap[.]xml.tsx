import { getPosts } from '~/.server/posts'

type SitemapItem = {
  url: string
  changefreq: 'daily' | 'weekly' | 'monthly' | 'yearly'
  priority: number
}

const BASE_URL = 'https://patwoz.dev'

export const loader = async () => {
  const ITEMS: SitemapItem[] = [
    {
      url: `${BASE_URL}`,
      changefreq: 'monthly',
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/blog`,
      changefreq: 'weekly',
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/what-i-built`,
      changefreq: 'weekly',
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/what-i-use`,
      changefreq: 'weekly',
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/qr`,
      changefreq: 'weekly',
      priority: 0.5,
    },
    ...(await getPosts()).map((item): SitemapItem => {
      return {
        url: `${BASE_URL}/blog/${item.slug}`,
        changefreq: 'weekly',
        priority: 0.7,
      }
    }),
    {
      url: `${BASE_URL}/imprint`,
      changefreq: 'yearly',
      priority: 0.3,
    },
  ]

  const urlsContent = ITEMS.map((item) => {
    return `
      <url>
        <loc>${item.url}</loc>
        <changefreq>${item.changefreq}</changefreq>
        <priority>${item.priority}</priority>
      </url>`
  }).join('\n')

  const content = `
    <?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${urlsContent}
    </urlset>
    `.trim()

  return new Response(content, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml',
      'xml-version': '1.0',
      encoding: 'UTF-8',
    },
  })
}
