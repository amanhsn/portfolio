import type { Metadata } from "next";
import { Inter, Geist, Geist_Mono, DM_Mono } from "next/font/google";
import { Providers } from "./providers";
import { CursorFollow } from "@/components/ui/cursor-follow";
import { Loader } from "@/components/site/loader";
import "./globals.css";

// Satoshi → Fontshare CDN (linked in <head>).
// Inter, Geist, Geist Mono, DM Mono → Google Fonts via next/font.

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-inter",
  display: "swap",
});

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
  display: "swap",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
});

const dmMono = DM_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-dm-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Aman's Portfolio",
  description:
    "Product designer bridging engineering, AI, and pure design. Currently at ImagineArt (Vyro.ai).",
  icons: {
    icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${geist.variable} ${geistMono.variable} ${dmMono.variable}`}
    >
      <head>
        {/* Satoshi - Fontshare CDN, 400/500/700 */}
        <link
          rel="preconnect"
          href="https://api.fontshare.com"
          crossOrigin=""
        />
        <link
          rel="preconnect"
          href="https://cdn.fontshare.com"
          crossOrigin=""
        />
        <link
          rel="stylesheet"
          href="https://api.fontshare.com/v2/css?f[]=satoshi@400,500,700&display=swap"
        />
      </head>
      <body>
        <Providers>
          {children}
          <CursorFollow />
          <Loader />
        </Providers>
      </body>
    </html>
  );
}
