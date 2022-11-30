


export const loader = () => {
  const content = `
        <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <url>
    <loc>https://patwoz.dev/</loc>
    <lastmod>2022-01-08T00:15:16+01:00</lastmod>
    <priority>1.0</priority>
    </url>
    </urlset>
    `
  // Return the response with the content, a status 200 message, and the appropriate headers for an XML page
  return new Response(content, {
    status: 200,
    headers: {
      "Content-Type": "application/xml",
      "xml-version": "1.0",
      "encoding": "UTF-8"
    }
  });
}
