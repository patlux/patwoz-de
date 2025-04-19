import type { PropsWithChildren } from 'react'

export type BlogLayoutProps = PropsWithChildren<{
  title: string
  description: string
}>

export const BlogLayout = ({
  title,
  description,
  children,
}: BlogLayoutProps) => {
  return (
    <>
      <h1>{title}</h1>
      <blockquote>{description}</blockquote>
      {children}
    </>
  )
}
