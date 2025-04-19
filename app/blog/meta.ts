export type BuildMetaProps = {
  title: string
  description: string
  published: string
}

export function buildMeta({ title, description, published }: BuildMetaProps) {
  return [
    { title },
    { name: 'description', content: description },
    { name: 'date', content: published },
    {
      name: 'article:published_time',
      content: new Date(published).toISOString(),
    },
  ]
}
