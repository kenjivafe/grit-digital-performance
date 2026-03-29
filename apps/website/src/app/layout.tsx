import type { Metadata } from "next";
import { Chakra_Petch, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { TooltipProvider } from "@/components/ui/tooltip";

const fontSans = Chakra_Petch({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "500", "600", "700"],
});

const fontMono = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://gritdigitalperformance.com"),

  title: {
    default: "Grit Digital Performance",
    template: "%s | Grit Digital Performance",
  },

  description:
    "High-performance websites and event registration platforms built for sports organizations. Launch faster, register more athletes, and run world-class events online.",

  keywords: [
    "sports website development",
    "race registration platform",
    "marathon registration system",
    "sports event websites",
    "athlete registration platform",
    "sports digital platforms",
  ],

  authors: [{ name: "Grit Digital Performance" }],
  creator: "Grit Digital Performance",
  publisher: "Grit Digital Performance",

  icons: {
    icon: [
      { url: "/favicon/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    shortcut: "/favicon/favicon.ico",
    apple: "/favicon/apple-touch-icon.png",
  },

  openGraph: {
    title: "Grit Digital Performance",
    description:
      "Modern high-performance websites and athlete registration systems for sports events and organizations.",
    url: "https://gritdigitalperformance.com",
    siteName: "Grit Digital Performance",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Grit Digital Performance - Sports Website & Registration Platforms",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Grit Digital Performance",
    description:
      "High-performance websites and registration systems for sports organizations.",
    images: ["/opengraph-image"],
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${fontSans.variable} ${fontMono.variable} font-sans antialiased`}
        suppressHydrationWarning
      >
        <TooltipProvider>{children}</TooltipProvider>
      </body>
    </html>
  );
}