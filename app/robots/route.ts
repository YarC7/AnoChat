export async function GET() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://anochat.online";
  const content = `User-agent: *\nAllow: /\nSitemap: ${siteUrl}/sitemap.xml\n`;

  return new Response(content, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
