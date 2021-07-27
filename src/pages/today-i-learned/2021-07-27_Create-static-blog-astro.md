---
title: Create a static generated blog with astro
published_at: 2021-07-27
layout: ../../layouts/til.astro
---
# Create a static generated blog with [astro](https://github.com/snowpackjs/astro)

First [init a new project with astro](https://github.com/snowpackjs/astro#quick-start).

Add the following file to the project:

`src/pages/$posts.astro`
```markdown
---
export async function createCollection() {
  const allPosts = Astro.fetchContent('../til/*.md')
    .sort((a, b) => a.title.localeCompare(b.title));

  console.log('allPosts:', allPosts);

  return {
    paginate: true,
    route: '/til/:page?',
    async props({paginate}) {
      return {
        posts: paginate(allPosts, {pageSize: 10}),
      };
    },
  };
}

const {posts} = Astro.props;
---
<html lang="en">
  {typeof posts.url}
  <br />
  2. {posts.data.map(d => Object.keys(d).join(', '))}
  2. {posts.data.map(d => Object.keys(d.astro).join(', '))}
  <br />
  3. {posts.data.map(post => {
    console.log(post)
      return <a url={post.url}>`${post.title} - ${post.astro.headers.join(', ')}`</a>;
    })}
</BaseLayout>
```



