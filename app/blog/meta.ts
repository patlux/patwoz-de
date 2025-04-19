export type BuildMetaProps = {
  title: string
  description: string
  image: string
  published: string
}

export function buildMeta({
  title,
  description,
  published,
  image,
}: BuildMetaProps) {
  return [
    { title },
    { name: 'description', content: description },
    { name: 'date', content: published },
    {
      name: 'article:published_time',
      content: new Date(published).toISOString(),
    },
    { name: 'og:image', content: image },
    { name: 'twitter:image', content: image },
  ]
}
