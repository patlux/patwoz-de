import type { PropsWithChildren } from 'react'

export type BlogLayoutProps = PropsWithChildren<{
  title: string
  description: string
  published: string
  tags?: string[]
}>

const dateFormatter = new Intl.DateTimeFormat('en-GB', {
  dateStyle: 'long',
})

export const BlogLayout = ({
  title,
  description,
  published,
  children,
}: BlogLayoutProps) => {
  const publishedDate = new Date(published)
  return (
    <>
      <time
        className="text-base opacity-70"
        dateTime={publishedDate.toISOString()}
      >
        {dateFormatter.format(publishedDate)}
      </time>
      <h1>{title}</h1>
      <blockquote>{description}</blockquote>
      {children}
    </>
  )
}
