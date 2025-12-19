import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { LanguageProvider } from "@/hooks/use-language";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AnonChat",
  description: "Anonymous Chat, Talk to Strangers, Make Friends",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://anochat.online"
  ),
  icons: {
    icon: "/favicon.ico",
    shortcut: "/icons/icon-192x192.png",
    apple: "/icons/icon-192x192.png",
  },
  openGraph: {
    title: "AnonChat",
    description: "Anonymous Chat, Talk to Strangers, Make Friends",
    url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://anochat.online",
    siteName: "AnonChat",
    type: "website",
    images: ["/icons/opengraph-image.png", "/icon-512x512.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "AnonChat",
    description: "Anonymous Chat, Talk to Strangers, Make Friends",
    images: ["/icons/twitter-image.png", "/icon-512x512.png"],
  },
  // Allow indexing by default; sitemap is served at /sitemap.xml
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <LanguageProvider>
          <Sonner position="top-center" />
          {/* Site structured data for search engines */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "WebSite",
                url:
                  process.env.NEXT_PUBLIC_SITE_URL ?? "https://anochat.online",
                name: "AnonChat",
                description: "Anonymous Chat, Talk to Strangers, Make Friends",
              }),
            }}
          />
          {/* <LangSelector /> */}
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
