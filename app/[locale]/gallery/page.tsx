import type { Metadata } from "next";
import Link from "next/link";

import { FaqSection, GallerySection, ReviewsSection } from "../page";
import { LocaleSwitcher } from "../locale-switcher";
import { getMessages, locales, type Locale } from "@/src/i18n/config";

interface PageProps {
  params: { locale: Locale };
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const messages = getMessages(params.locale);
  const seo = messages.gallerySeo ?? messages.seo;

  return {
    title: seo.title,
    description: seo.description,
    keywords: seo.keywords,
    openGraph: {
      title: seo.openGraphTitle,
      description: seo.openGraphDescription,
      images: [
        {
          url: seo.openGraphImage,
          width: 1200,
          height: 630,
          alt: messages.navbar.brand,
        },
      ],
      locale: params.locale,
      type: "website",
    },
    alternates: {
      canonical: `/${params.locale}/gallery`,
      languages: {
        vi: "/vi/gallery",
        en: "/en/gallery",
        ja: "/ja/gallery",
      },
    },
  };
}

export default function GalleryPage({ params }: PageProps) {
  const locale = locales.includes(params.locale) ? params.locale : locales[0];
  const messages = getMessages(locale);
  const homeHref = `/${locale}`;
  const bookingHref = `/${locale}/booking`;

  return (
    <main className="min-h-screen bg-gradient-to-b from-sakura-50 via-white to-mizu-50 text-slate-900">
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <div className="absolute -top-24 -left-20 h-72 w-72 bg-sakura-200/50 blur-3xl rounded-full" />
        <div className="absolute top-40 -right-10 h-80 w-80 bg-mizu-200/60 blur-3xl rounded-full" />
      </div>

      <div className="relative mx-auto max-w-6xl px-6 py-10 space-y-8">
        <div className="flex items-center justify-between gap-3 flex-wrap">
          <div className="flex items-center gap-3">
            <div className="h-11 w-11 rounded-full bg-gradient-to-br from-sakura-200 to-mizu-200 shadow-soft" aria-hidden />
            <div>
              <p className="text-base font-semibold text-slate-900">{messages.navbar.brand}</p>
              <p className="text-sm text-slate-600">{messages.gallery.subtitle}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <LocaleSwitcher locale={locale} labels={messages.navbar.languages} />
            <Link
              href={homeHref}
              className="rounded-full border border-slate-200 bg-white/80 px-4 py-2 text-sm font-semibold text-sakura-700 hover:border-sakura-400"
            >
              ← {messages.hero.secondaryCta}
            </Link>
            <Link
              href={bookingHref}
              className="rounded-full bg-sakura-500 px-4 py-2 text-sm font-semibold text-white shadow-soft hover:shadow-lg"
            >
              {messages.hero.primaryCta}
            </Link>
          </div>
        </div>

        <div className="rounded-3xl border border-slate-100 bg-white/85 shadow-soft p-6 space-y-2">
          <p className="text-sm font-semibold uppercase tracking-wide text-sakura-700">{messages.showcase.kicker}</p>
          <h1 className="text-3xl md:text-4xl font-display text-slate-900">{messages.gallery.title}</h1>
          <p className="text-slate-700 max-w-3xl">{messages.gallery.subtitle}</p>
        </div>

        <div className="rounded-3xl border border-slate-100 bg-white/85 shadow-soft p-6 space-y-10">
          <GallerySection messages={messages} />
          <ReviewsSection messages={messages} />
          <FaqSection messages={messages} />
        </div>
      </div>
    </main>
  );
}
