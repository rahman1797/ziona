import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { AnalyticsProvider } from "@/components/layout/analytics-provider";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { brand } from "@/lib/constants";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(brand.url),
  title: {
    default: "Ziona | Sepatu Wanita Premium Indonesia",
    template: "%s | Ziona",
  },
  description:
    "Sepatu wanita premium minimalis dari brand lokal Indonesia. Temukan sepatu hak, flat, sandal, loafer, dan sneaker yang dibuat untuk kenyamanan elegan.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_ID",
    url: brand.url,
    siteName: "Ziona",
    title: "Ziona | Sepatu Wanita Premium Indonesia",
    description:
      "Kenyamanan elegan dari brand sepatu wanita lokal Indonesia.",
    images: [
      {
        url: "/og",
        width: 1200,
        height: 630,
        alt: "Sepatu wanita premium Ziona",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ziona | Sepatu Wanita Premium Indonesia",
    description:
      "Kenyamanan elegan dari brand sepatu wanita lokal Indonesia.",
    images: ["/og"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={`${inter.variable} ${playfair.variable}`}>
      <body className="flex min-h-screen flex-col text-[#1C1C1C]">
        <AnalyticsProvider />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
