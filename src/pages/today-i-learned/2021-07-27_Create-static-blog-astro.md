---
title: Create a static generated blog with astro
published_at: 2021-07-27
tags: javascript
layout: ../../layouts/til.astro
---

# Create a static generated blog with [astro](https://astro.build/)

First [init a new project with astro](https://github.com/snowpackjs/astro#quick-start).

```bash
mkdir astro-blog
cd astro-blog
npm init astro
Need to install the following packages:
  create-astro
Ok to proceed? (y) y
# Choose the "Generic" template
```

Add the following file to the project:

`src/pages/$posts.astro`

```markdown
export async function createCollection() {
const posts = Astro.fetchContent('./posts/\*.md')
.sort((a, b) => a.title.localeCompare(b.title));
return {
route: '/posts',
props: () => {
return { posts };
},
};
}

## const {posts} = Astro.props;

<html lang="en">
  <body>
    {posts.map(post => {
      return <a url={post.url}>${post.title}</a>;
    })}
  </body>
</html>
```

Create a new file `src/layouts/posts.astro` with the following content:

```markdown
---
const { content } = Astro.props;
---

<html lang="en">
  <head>
    <title>{content.title}</title>
  </head>
  <body>
    {content}
    <article class="prose">
      <slot />
    </article>
  </body>
</html>
```

Create a new file `src/pages/posts/hello-world.md` with the following content:

```markdown
---
title: Hello World
layout: ../../layouts/post.astro
---

# Hello World

This is an example blog post
```

Now run the project and you should see a list of blog posts at `http://localhost:3000/posts`

```bash
npm run start
# open manually http://localhost:3000/posts
```
