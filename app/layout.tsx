import type { Metadata } from "next";
import { Manrope, Noto_Serif_JP } from "next/font/google";
import type { ReactNode } from "react";
import "./globals.css";
import { defaultLocale, locales } from "@/src/i18n/config";

const display = Noto_Serif_JP({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-display",
});

const body = Manrope({
  subsets: ["latin"],
  variable: "--font-body",
});

export const metadata: Metadata = {
  title: {
    default: "An Nhien Kimono Kyoto",
    template: "%s | An Nhien Kimono Kyoto",
  },
  description:
    "Kimono rental, hair & makeup, and outdoor photography in Kyoto with pastel aesthetics.",
  icons: {
    icon: "/favicon.ico",
  },
  metadataBase: new URL("https://example.com"),
};

export default function RootLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: { locale?: string };
}) {
  const locale = locales.includes((params?.locale as typeof locales[number]) ?? "")
    ? (params?.locale as typeof locales[number])
    : defaultLocale;

  return (
    <html lang={locale}>
      <body className={`${display.variable} ${body.variable} font-body`}>{children}</body>
    </html>
  );
}
