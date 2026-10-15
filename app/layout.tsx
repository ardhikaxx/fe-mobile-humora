import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { HumoraProvider } from "../lib/context/HumoraContext";
import { AppShell } from "../components/layout/AppShell";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "HUMORA — Scroll. laugh. repeat.",
  description: "Platform streaming series pendek Indonesia penuh tawa dan cerita seru.",
  manifest: "/manifest.json",
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
  themeColor: "#FFD52E",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className={`${plusJakartaSans.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-[#F3EFE9]">
        <HumoraProvider>
          <AppShell>{children}</AppShell>
        </HumoraProvider>
      </body>
    </html>
  );
}
