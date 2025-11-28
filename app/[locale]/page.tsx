import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { MobileViewShell } from "./mobile-view-shell";
import { getMessages, locales, type Locale, type Messages } from "@/src/i18n/config";

interface PageProps {
  params: { locale: Locale };
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const messages = getMessages(params.locale);

  return {
    title: messages.seo.title,
    description: messages.seo.description,
    keywords: messages.seo.keywords,
    openGraph: {
      title: messages.seo.openGraphTitle,
      description: messages.seo.openGraphDescription,
      images: [
        {
          url: messages.seo.openGraphImage,
          width: 1200,
          height: 630,
          alt: messages.navbar.brand,
        },
      ],
      locale: params.locale,
      type: "website",
    },
    alternates: {
      canonical: `/${params.locale}`,
      languages: {
        vi: "/vi",
        en: "/en",
        ja: "/ja",
      },
    },
  };
}

function SectionHeading({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="text-center space-y-2">
      <h2 className="text-3xl md:text-4xl font-display tracking-tight text-slate-900">{title}</h2>
      {subtitle ? <p className="text-slate-600 max-w-3xl mx-auto text-lg">{subtitle}</p> : null}
    </div>
  );
}

function DesktopHeader({
  messages,
  locale,
  bookingHref,
}: {
  messages: Messages;
  locale: Locale;
  bookingHref: string;
}) {
  return (
    <header className="sticky top-0 z-30 backdrop-blur bg-white/80 shadow-sm">
      <nav className="mx-auto max-w-6xl px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-gradient-to-br from-sakura-200 to-mizu-200 shadow-soft" aria-hidden />
          <span className="text-lg md:text-xl font-display text-slate-900">{messages.navbar.brand}</span>
        </div>
        <div className="hidden lg:flex items-center gap-8 text-sm font-medium text-slate-700">
          <a href="#services" className="hover:text-sakura-700 transition-colors">
            {messages.navbar.menu.services}
          </a>
          <a href="#pricing" className="hover:text-sakura-700 transition-colors">
            {messages.navbar.menu.pricing}
          </a>
          <a href="#gallery" className="hover:text-sakura-700 transition-colors">
            {messages.navbar.menu.gallery}
          </a>
          <a href="#reviews" className="hover:text-sakura-700 transition-colors">
            {messages.navbar.menu.reviews}
          </a>
          <a href="#faq" className="hover:text-sakura-700 transition-colors">
            {messages.navbar.menu.faq}
          </a>
          <Link
            href={bookingHref}
            target="_blank"
            rel="noreferrer"
            className="hover:text-sakura-700 transition-colors"
          >
            {messages.navbar.menu.booking}
          </Link>
        </div>
        <div className="flex items-center gap-3 text-xs uppercase tracking-wide text-slate-700">
          {locales.map((code) => (
            <Link
              key={code}
              href={`/${code}`}
              className={`px-3 py-1 rounded-full border transition-colors ${
                code === locale
                  ? "border-sakura-500 bg-sakura-100 text-sakura-700"
                  : "border-slate-200 hover:border-sakura-400"
              }`}
            >
              {messages.navbar.languages[code]}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}

function HeroSection({ messages, bookingHref }: { messages: Messages; bookingHref: string }) {
  return (
    <section className="relative isolate overflow-hidden">
      <div className="mx-auto max-w-6xl px-6 pt-12 md:pt-20 pb-14 md:pb-24 grid md:grid-cols-2 gap-10 md:gap-12 items-center">
        <div className="space-y-6">
          <p className="inline-flex items-center gap-2 rounded-full bg-white/70 px-4 py-2 text-sm text-slate-700 shadow-soft border border-slate-100">
            <span className="h-2 w-2 rounded-full bg-sakura-500" aria-hidden />
            {messages.hero.badge}
          </p>
          <h1 className="text-4xl md:text-5xl font-display tracking-tight leading-tight text-slate-900">
            {messages.hero.title}
          </h1>
          <p className="text-lg text-slate-700 leading-relaxed max-w-2xl">{messages.hero.subtitle}</p>
          <div className="flex flex-wrap gap-4">
            <Link
              href={bookingHref}
              target="_blank"
              rel="noreferrer"
              className="px-6 py-3 rounded-full bg-gradient-to-r from-sakura-500 to-mizu-500 text-white font-semibold shadow-soft hover:shadow-lg transition-transform hover:-translate-y-0.5"
            >
              {messages.hero.primaryCta}
            </Link>
            <a
              href="#pricing"
              className="px-6 py-3 rounded-full border border-sakura-200 text-sakura-700 bg-white/80 font-semibold hover:border-sakura-500 hover:text-sakura-800"
            >
              {messages.hero.secondaryCta}
            </a>
          </div>
          <div className="grid grid-cols-3 gap-3 text-sm text-slate-600 max-w-xl">
            {messages.hero.highlights.map((item) => (
              <div key={item.title} className="rounded-2xl bg-white/70 p-4 border border-slate-100 shadow-soft">
                <p className="font-semibold text-slate-900">{item.title}</p>
                <p>{item.description}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="relative">
          <div className="absolute -inset-4 bg-gradient-to-br from-sakura-100 via-white to-mizu-100 rounded-[32px] blur-2xl" aria-hidden />
          <div className="grid grid-cols-2 gap-3 md:gap-4">
            {messages.hero.collage.map((image) => (
              <div key={image.src} className="relative overflow-hidden rounded-[22px] border border-white/70 shadow-soft bg-white/70">
                <div className="relative aspect-[4/5] md:aspect-[5/6]">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className="object-cover"
                    sizes="(min-width: 1024px) 260px, 50vw"
                    priority
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ShowcaseSection({ messages }: { messages: Messages }) {
  return (
    <section className="py-12 md:py-16 bg-white/80">
      <div className="mx-auto max-w-6xl px-6 space-y-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-2">
            <p className="text-sm font-semibold uppercase tracking-wide text-sakura-700">{messages.showcase.kicker}</p>
            <h2 className="text-3xl md:text-4xl font-display text-slate-900">{messages.showcase.title}</h2>
            <p className="text-slate-600 max-w-3xl">{messages.showcase.subtitle}</p>
          </div>
          <a
            href="#gallery"
            className="inline-flex items-center gap-2 rounded-full border border-sakura-200 bg-white/70 px-4 py-2 text-sakura-700 font-semibold hover:border-sakura-500 hover:text-sakura-800"
          >
            {messages.showcase.cta}
          </a>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {messages.showcase.images.map((image, index) => (
            <div key={`${image.src}-${index}`} className="relative overflow-hidden rounded-3xl border border-white/70 shadow-soft bg-white/70">
              <div className="relative aspect-[4/5] md:aspect-[5/6]">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover hover:scale-105 transition-transform"
                  sizes="(min-width: 1024px) 280px, 48vw"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function BannerSection({ messages, bookingHref }: { messages: Messages; bookingHref: string }) {
  return (
    <section className="py-10 md:py-14">
      <div className="mx-auto max-w-6xl px-6">
        <div className="rounded-[28px] border border-sakura-100 bg-gradient-to-r from-sakura-50 via-white to-mizu-50 shadow-soft p-6 md:p-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-3 text-center md:text-left">
            <p className="text-sm font-semibold uppercase tracking-wide text-sakura-700">{messages.banner.kicker}</p>
            <h3 className="text-2xl md:text-3xl font-display text-slate-900">{messages.banner.title}</h3>
            <p className="text-slate-700 max-w-2xl">{messages.banner.subtitle}</p>
          </div>
            <Link
              href={bookingHref}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-sakura-500 px-6 py-3 text-white font-semibold shadow-soft hover:shadow-lg transition-transform hover:-translate-y-0.5"
            >
              {messages.banner.cta}
            </Link>
          </div>
      </div>
    </section>
  );
}

function ReasonsSection({ messages }: { messages: Messages }) {
  return (
    <section className="py-16 md:py-20 bg-white/70">
      <div className="mx-auto max-w-6xl px-6 space-y-10">
        <SectionHeading title={messages.reasons.title} subtitle={messages.reasons.subtitle} />
        <div className="grid md:grid-cols-3 gap-6">
          {messages.reasons.items.map((reason) => (
            <div key={reason.title} className="rounded-3xl border border-slate-100 bg-white/80 shadow-soft overflow-hidden flex flex-col">
              <div className="relative aspect-[4/3]">
                <Image src={reason.image} alt={reason.title} fill className="object-cover" sizes="(min-width: 1024px) 360px, 100vw" />
              </div>
              <div className="p-6 space-y-2 flex-1">
                <h3 className="text-xl font-display text-slate-900">{reason.title}</h3>
                <p className="text-slate-600 leading-relaxed">{reason.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ServicesSection({ messages, id }: { messages: Messages; id?: string }) {
  return (
    <section id={id} className="py-16 md:py-20">
      <div className="mx-auto max-w-6xl px-6 space-y-10">
        <SectionHeading title={messages.services.title} />
        <div className="grid md:grid-cols-3 gap-6">
          {messages.services.items.map((service) => (
            <div
              key={service.name}
              className="rounded-3xl bg-white/80 border border-slate-100 shadow-soft p-6 space-y-4 hover:-translate-y-1 transition-transform"
            >
              <div className="h-12 w-12 rounded-2xl bg-sakura-100 text-sakura-700 grid place-items-center font-semibold">•</div>
              <div className="space-y-2">
                <h3 className="text-xl font-display text-slate-900">{service.name}</h3>
                <p className="text-slate-600 leading-relaxed">{service.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function PricingSection({ messages, id, bookingHref }: { messages: Messages; id?: string; bookingHref: string }) {
  return (
    <section id={id} className="py-16 md:py-20 bg-white/70">
      <div className="mx-auto max-w-6xl px-6 space-y-10">
        <SectionHeading title={messages.pricing.title} subtitle={messages.pricing.note} />
        <div className="grid md:grid-cols-3 gap-6">
          {messages.pricing.cards.map((card) => (
            <div
              key={card.name}
              className="rounded-3xl border border-slate-100 bg-gradient-to-b from-sakura-50 to-white shadow-soft p-7 flex flex-col gap-4 hover:-translate-y-1 transition-transform"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-display text-slate-900">{card.name}</h3>
                <span className="text-lg font-semibold text-sakura-700">{card.price}</span>
              </div>
              <ul className="space-y-2 text-slate-600">
                {card.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2">
                    <span className="mt-1 h-2 w-2 rounded-full bg-sakura-500" aria-hidden />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
                <Link
                  href={bookingHref}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-auto inline-flex justify-center px-4 py-2 rounded-full border border-sakura-200 text-sakura-700 bg-white/80 font-semibold hover:border-sakura-500 hover:text-sakura-800"
                >
                  {messages.hero.primaryCta}
                </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function GallerySection({ messages, id }: { messages: Messages; id?: string }) {
  return (
    <section id={id} className="py-16 md:py-20">
      <div className="mx-auto max-w-6xl px-6 space-y-10">
        <SectionHeading title={messages.gallery.title} subtitle={messages.gallery.subtitle} />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {messages.gallery.images.map((image) => (
            <div key={image.src} className="overflow-hidden rounded-3xl border border-slate-100 shadow-soft bg-white/70">
              <Image
                src={image.src}
                alt={image.alt}
                width={800}
                height={600}
                className="h-full w-full object-cover hover:scale-105 transition-transform"
                sizes="(min-width: 1024px) 280px, 48vw"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ReviewsSection({ messages, id }: { messages: Messages; id?: string }) {
  return (
    <section id={id} className="py-16 md:py-20 bg-white/70">
      <div className="mx-auto max-w-6xl px-6 space-y-10">
        <SectionHeading title={messages.reviews.title} />
        <div className="grid md:grid-cols-3 gap-6">
          {messages.reviews.items.map((review) => (
            <div
              key={review.name}
              className="rounded-3xl border border-slate-100 bg-gradient-to-b from-white to-sakura-50/40 shadow-soft p-6 space-y-4"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-lg font-display text-slate-900">{review.name}</p>
                  <p className="text-sm text-slate-600">{review.role}</p>
                </div>
                <div className="flex items-center gap-1 text-sakura-500" aria-label="5-star rating">
                  {Array.from({ length: 5 }).map((_, idx) => (
                    <span key={idx}>★</span>
                  ))}
                </div>
              </div>
              <p className="text-slate-700 leading-relaxed">{review.content}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FaqSection({ messages, id }: { messages: Messages; id?: string }) {
  return (
    <section id={id} className="py-16 md:py-20">
      <div className="mx-auto max-w-5xl px-6 space-y-10">
        <SectionHeading title={messages.faq.title} />
        <div className="space-y-4">
          {messages.faq.items.map((item) => (
            <details key={item.question} className="group rounded-2xl border border-slate-100 bg-white/80 shadow-soft p-5">
              <summary className="flex cursor-pointer items-center justify-between gap-3 text-lg font-display text-slate-900">
                <span>{item.question}</span>
                <span className="text-sakura-600 transition-transform group-open:rotate-90">›</span>
              </summary>
              <p className="mt-3 text-slate-600 leading-relaxed">{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

export function BookingSection({ messages, id }: { messages: Messages; id?: string }) {
  return (
    <section id={id} className="py-16 md:py-20 bg-white/70">
      <div className="mx-auto max-w-5xl px-6">
        <div className="rounded-3xl border border-slate-100 bg-gradient-to-r from-sakura-50 via-white to-mizu-50 shadow-soft p-8 md:p-10 space-y-8">
          <SectionHeading title={messages.booking.title} subtitle={messages.booking.subtitle} />
          <form className="grid md:grid-cols-2 gap-4 md:gap-6">
            <div className="space-y-2">
              <label className="text-sm text-slate-700 font-medium" htmlFor="name">
                {messages.booking.form.name}
              </label>
              <input
                id="name"
                name="name"
                className="w-full rounded-2xl border border-slate-200 bg-white/80 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-sakura-300"
                placeholder={messages.booking.form.name}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm text-slate-700 font-medium" htmlFor="email">
                {messages.booking.form.email}
              </label>
              <input
                id="email"
                name="email"
                type="email"
                className="w-full rounded-2xl border border-slate-200 bg-white/80 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-sakura-300"
                placeholder={messages.booking.form.email}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm text-slate-700 font-medium" htmlFor="date">
                {messages.booking.form.date}
              </label>
              <input
                id="date"
                name="date"
                type="date"
                className="w-full rounded-2xl border border-slate-200 bg-white/80 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-sakura-300"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm text-slate-700 font-medium" htmlFor="people">
                {messages.booking.form.people}
              </label>
              <input
                id="people"
                name="people"
                type="number"
                min="1"
                className="w-full rounded-2xl border border-slate-200 bg-white/80 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-sakura-300"
                placeholder={messages.booking.form.people}
              />
            </div>
            <div className="space-y-2 md:col-span-2">
              <label className="text-sm text-slate-700 font-medium" htmlFor="package">
                {messages.booking.form.package}
              </label>
              <input
                id="package"
                name="package"
                className="w-full rounded-2xl border border-slate-200 bg-white/80 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-sakura-300"
                placeholder={messages.booking.form.package}
              />
            </div>
            <div className="space-y-2 md:col-span-2">
              <label className="text-sm text-slate-700 font-medium" htmlFor="note">
                {messages.booking.form.note}
              </label>
              <textarea
                id="note"
                name="note"
                rows={3}
                className="w-full rounded-2xl border border-slate-200 bg-white/80 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-sakura-300"
                placeholder={messages.booking.form.note}
              />
            </div>
            <div className="md:col-span-2 flex items-center justify-between gap-4">
              <p className="text-sm text-slate-600">{messages.pricing.note}</p>
              <button
                type="button"
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-sakura-500 to-mizu-500 px-6 py-3 text-white font-semibold shadow-soft hover:shadow-lg transition-transform hover:-translate-y-0.5"
                aria-label={messages.booking.form.submit}
              >
                {messages.booking.form.submit}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

function FooterSection({ messages }: { messages: Messages }) {
  return (
    <footer className="border-t border-slate-200 bg-white/80">
      <div className="mx-auto max-w-6xl px-6 py-10 grid md:grid-cols-4 gap-6 text-sm text-slate-700">
        <div className="space-y-2">
          <p className="font-display text-lg text-slate-900">{messages.navbar.brand}</p>
          <p className="text-slate-600">{messages.seo.description}</p>
        </div>
        <div className="space-y-2">
          <p className="font-semibold text-slate-900">{messages.navbar.menu.services}</p>
          <p>{messages.services.items[0].name}</p>
          <p>{messages.services.items[1].name}</p>
          <p>{messages.services.items[2].name}</p>
        </div>
        <div className="space-y-2">
          <p className="font-semibold text-slate-900">{messages.navbar.menu.booking}</p>
          <p>{messages.footer.address}</p>
          <p>{messages.footer.hours}</p>
          <p>{messages.footer.contact}</p>
        </div>
        <div className="space-y-2">
          <p className="font-semibold text-slate-900">{messages.footer.social}</p>
          <div className="flex items-center gap-3 text-slate-600">
            {messages.footer.socialLinks.map((link) => (
              <span key={link} aria-hidden>
                {link}
              </span>
            ))}
          </div>
          <p className="text-xs text-slate-500">© {new Date().getFullYear()} {messages.navbar.brand}</p>
        </div>
      </div>
    </footer>
  );
}

export default function LocalePage({ params }: PageProps) {
  const locale = locales.includes(params.locale) ? params.locale : locales[0];
    const messages = getMessages(locale);
    const bookingHref = `/${locale}/booking`;

    const mobileViews = {
      home: (
        <div className="space-y-6">
          <HeroSection messages={messages} bookingHref={bookingHref} />
          <ShowcaseSection messages={messages} />
          <BannerSection messages={messages} bookingHref={bookingHref} />
        </div>
      ),
    plans: (
      <div className="space-y-6">
          <PricingSection messages={messages} bookingHref={bookingHref} />
          <ReasonsSection messages={messages} />
      </div>
    ),
    booking: <BookingSection messages={messages} />,
    gallery: (
      <div className="space-y-6">
        <GallerySection messages={messages} />
        <ReviewsSection messages={messages} />
        <FaqSection messages={messages} />
      </div>
    ),
  } as const;

  return (
    <main className="min-h-screen bg-gradient-to-b from-sakura-50 via-white to-mizu-50 text-slate-900">
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <div className="absolute -top-24 -left-20 h-72 w-72 bg-sakura-200/50 blur-3xl rounded-full" />
        <div className="absolute top-40 -right-10 h-80 w-80 bg-mizu-200/60 blur-3xl rounded-full" />
      </div>

      <MobileViewShell locale={locale} messages={messages} views={mobileViews} />

      <div className="hidden lg:block relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" aria-hidden>
          <div className="absolute -top-24 -left-20 h-72 w-72 bg-sakura-200/50 blur-3xl rounded-full" />
          <div className="absolute top-40 -right-10 h-80 w-80 bg-mizu-200/60 blur-3xl rounded-full" />
        </div>
        <DesktopHeader messages={messages} locale={locale} bookingHref={bookingHref} />
        <HeroSection messages={messages} bookingHref={bookingHref} />
        <ShowcaseSection messages={messages} />
        <BannerSection messages={messages} bookingHref={bookingHref} />
        <ReasonsSection messages={messages} />
        <ServicesSection messages={messages} id="services" />
        <PricingSection messages={messages} id="pricing" bookingHref={bookingHref} />
        <GallerySection messages={messages} id="gallery" />
        <ReviewsSection messages={messages} id="reviews" />
        <FaqSection messages={messages} id="faq" />
        <BookingSection messages={messages} id="booking" />
        <FooterSection messages={messages} />
      </div>
    </main>
  );
}
