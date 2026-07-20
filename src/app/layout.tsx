import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "StudentOS — Your University, Powered by AI",
    template: "%s | StudentOS",
  },
  description:
    "Bangladesh's most advanced AI-powered Student Companion platform. Plan smarter, study faster, achieve more.",
  keywords: [
    "StudentOS",
    "AIUB",
    "student platform",
    "AI study planner",
    "CGPA calculator",
    "Bangladesh education",
    "university companion",
  ],
  authors: [{ name: "StudentOS Team" }],
  creator: "StudentOS",
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"),
  openGraph: {
    type: "website",
    locale: "en_US",
    alternateLocale: "bn_BD",
    url: "/",
    siteName: "StudentOS",
    title: "StudentOS — Your University, Powered by AI",
    description:
      "Bangladesh's most advanced AI-powered Student Companion platform. Plan smarter, study faster, achieve more.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "StudentOS — AI-Powered Student Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "StudentOS — Your University, Powered by AI",
    description:
      "Bangladesh's most advanced AI-powered Student Companion platform.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  manifest: "/manifest.json",
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f8f9ff" },
    { media: "(prefers-color-scheme: dark)", color: "#1a1a2e" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
