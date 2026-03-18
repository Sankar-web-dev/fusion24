import type { Metadata } from "next";
import { Bebas_Neue, Inter, Montserrat } from "next/font/google";
import "./globals.css";

import { SiteFooter } from "@/components/layout/site-footer";
import { SiteNavbar } from "@/components/layout/site-navbar";
import { ThemeProvider } from "@/components/providers/theme-provider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const bebas = Bebas_Neue({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-bebas",
  display: "swap",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "FUSION 24 — Unleash Your Strength",
    template: "%s — FUSION 24",
  },
  description:
    "Premium 24/7 gym experience with elite coaching, modern equipment, and a community built for performance.",
  metadataBase: new URL("http://localhost:3000"),
  openGraph: {
    title: "FUSION 24 — Unleash Your Strength",
    description:
      "Premium 24/7 gym experience with elite coaching, modern equipment, and a community built for performance.",
    type: "website",
  },
};

export const viewport = {
  themeColor: "#07070a",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "HealthClub",
  name: "FUSION 24",
  slogan: "UNLEASH YOUR STRENGTH",
  description:
    "Premium 24/7 gym experience with elite coaching, modern equipment, and a community built for performance.",
};

const fontVars = `${inter.variable} ${bebas.variable} ${montserrat.variable} antialiased`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={fontVars}>
        <ThemeProvider>
          <div className="min-h-dvh">
            <SiteNavbar />
            <main className="pt-16">{children}</main>
            <SiteFooter />
          </div>
        </ThemeProvider>

        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
