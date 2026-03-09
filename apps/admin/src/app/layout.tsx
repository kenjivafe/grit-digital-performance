import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ClientLayout from './layout-client';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title:
    "Grit Admin - Sports Organization Management Dashboard",
  description:
    "Admin dashboard for managing sports organizations, events, registrations, and analytics. Complete control over your digital sports platform.",
  icons: {
    icon: [
      { url: "/favicon/favicon-admin.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon/favicon-admin.png", sizes: "32x32", type: "image/png" },
    ],
    apple: "/favicon/favicon-admin.png",
    shortcut: "/favicon/favicon-admin.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className} suppressHydrationWarning>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}


