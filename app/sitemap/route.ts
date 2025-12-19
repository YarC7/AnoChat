export async function GET() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://anochat.online";

  // Keep this list in sync with your public routes; expand as needed.
  const pages = [
    "",
    "/portal/chat",
    "/portal/chat-demo",
    "/portal/dashboard",
    "/portal/icebreaker",
    "/portal/premium",
    "/portal/premium/checkout",
    "/portal/premium/success",
    "/portal/profile",
    "/portal/settings",
  ];

  const lastmod = new Date().toISOString();

  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

  for (const page of pages) {
    xml += "  <url>\n";
    xml += `    <loc>${siteUrl}${page}</loc>\n`;
    xml += `    <lastmod>${lastmod}</lastmod>\n`;
    xml += "  </url>\n";
  }

  xml += "</urlset>\n";

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
