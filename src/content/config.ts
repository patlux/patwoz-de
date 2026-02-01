import { defineCollection, z } from 'astro:content'

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    published: z.coerce.date(),
    image: z.string().optional(),
    featured: z.boolean().optional().default(false),
  }),
})

const germanBlog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    published: z.coerce.date(),
    image: z.string().optional(),
    featured: z.boolean().optional().default(false),
  }),
})

export const collections = { blog, 'blog-de': germanBlog }
