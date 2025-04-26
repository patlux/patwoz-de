import type { PropsWithChildren } from 'react'

export type BlogLayoutProps = PropsWithChildren<{
  title: string
  description: string
  published: string
  image?: string
  tags?: string[]
}>

const dateFormatter = new Intl.DateTimeFormat('en-GB', {
  dateStyle: 'long',
})

export const BlogLayout = ({
  title,
  description,
  published,
  image,
  children,
}: BlogLayoutProps) => {
  const publishedDate = new Date(published)
  return (
    <>
      <header className="flex flex-col-reverse sm:flex-row gap-x-8 mb-8">
        <div>
          <time
            className="text-base opacity-70"
            dateTime={publishedDate.toISOString()}
          >
            {dateFormatter.format(publishedDate)}
          </time>
          <h1>{title}</h1>
          <blockquote className="mb-0">{description}</blockquote>
        </div>
        {image && (
          <div>
            <img
              width="200px"
              height="200px"
              className="w-full sm:w-auto mt-0"
              src={image}
              alt={title}
            />
          </div>
        )}
      </header>
      {children}
    </>
  )
}
