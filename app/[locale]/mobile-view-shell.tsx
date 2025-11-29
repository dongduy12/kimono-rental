"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { Locale, Messages } from "@/src/i18n/config";
import { locales } from "@/src/i18n/config";

type MobileViewKey = "home" | "plans" | "booking" | "gallery";

interface MobileViewShellProps {
  locale: Locale;
  messages: Messages;
  views: Record<MobileViewKey, React.ReactNode>;
}

export function MobileViewShell({ locale, messages, views }: MobileViewShellProps) {
  const [activeView, setActiveView] = useState<MobileViewKey>("home");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = useMemo(
    () => [
      { key: "home" as const, label: messages.mobileNav.home },
      { key: "plans" as const, label: messages.mobileNav.plans },
      { key: "booking" as const, label: messages.mobileNav.booking },
      { key: "gallery" as const, label: messages.mobileNav.gallery },
    ],
    [messages.mobileNav],
  );

  return (
    <div className="lg:hidden">
      <header className="sticky top-0 z-30 bg-white/90 backdrop-blur border-b border-slate-200">
        <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between relative">
          <div className="flex items-center gap-2">
            <div className="h-9 w-9 rounded-full bg-gradient-to-br from-sakura-200 to-mizu-200 shadow-soft" aria-hidden />
            <span className="text-sm font-semibold text-slate-900">
              {messages.navbar.brand}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 text-[11px] uppercase tracking-wide text-slate-700">
              {locales.map((code) => (
                <Link
                  key={code}
                  href={`/${code}`}
                  className={`px-2.5 py-1 rounded-full border transition-colors ${
                    code === locale
                      ? "border-sakura-500 bg-sakura-100 text-sakura-700"
                      : "border-slate-200 hover:border-sakura-400"
                  }`}
                >
                  {messages.navbar.languages[code]}
                </Link>
              ))}
            </div>
            <button
              type="button"
              onClick={() => setIsMenuOpen((prev) => !prev)}
              className="h-10 w-10 grid place-items-center rounded-full border border-slate-200 bg-white shadow-soft text-slate-700"
              aria-label="Toggle navigation menu"
              aria-expanded={isMenuOpen}
            >
              <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
                <path
                  d="M4 7h16M4 12h16M4 17h16"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
              </svg>
            </button>
            <div
              className={`absolute right-4 top-14 w-52 rounded-2xl border border-slate-100 bg-white shadow-soft transition-all duration-200 origin-top-right ${
                isMenuOpen ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"
              }`}
              role="menu"
            >
              <div className="py-2 text-sm text-slate-700">
                <a
                  className="block px-4 py-2 hover:bg-sakura-50"
                  href="#services"
                  role="menuitem"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {messages.navbar.menu.services}
                </a>
                <a
                  className="block px-4 py-2 hover:bg-sakura-50"
                  href="#pricing"
                  role="menuitem"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {messages.navbar.menu.pricing}
                </a>
                <Link
                  className="block px-4 py-2 hover:bg-sakura-50"
                  href={`/${locale}/gallery`}
                  role="menuitem"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {messages.navbar.menu.gallery}
                </Link>
                <a
                  className="block px-4 py-2 hover:bg-sakura-50"
                  href="#reviews"
                  role="menuitem"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {messages.navbar.menu.reviews}
                </a>
                <a
                  className="block px-4 py-2 hover:bg-sakura-50"
                  href="#faq"
                  role="menuitem"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {messages.navbar.menu.faq}
                </a>
                <Link
                  className="block px-4 py-2 hover:bg-sakura-50"
                  href={`/${locale}/booking`}
                  role="menuitem"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {messages.navbar.menu.booking}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="pb-24 pt-2 bg-gradient-to-b from-sakura-50 via-white to-mizu-50 min-h-screen">
        <div className="mx-auto max-w-xl px-4 space-y-8">
          <div className="rounded-3xl border border-slate-100 bg-white/80 shadow-soft p-3">
            <div className="grid grid-cols-4 gap-2 text-xs text-slate-600">
              {navItems.map((item) => (
                <button
                  key={item.key}
                  type="button"
                  onClick={() => setActiveView(item.key)}
                  className={`rounded-2xl px-3 py-2 font-semibold transition-colors ${
                    activeView === item.key
                      ? "bg-gradient-to-r from-sakura-500 to-mizu-500 text-white shadow-soft"
                      : "bg-white border border-slate-100"
                  }`}
                  aria-pressed={activeView === item.key}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-slate-100 bg-white/85 shadow-soft overflow-hidden">
            <div key={activeView} className="animate-fade px-3 py-4 space-y-6">
              {views[activeView]}
            </div>
          </div>
        </div>
      </div>

      <nav className="fixed inset-x-0 bottom-0 z-30 border-t border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto max-w-xl grid grid-cols-4 text-center text-xs font-semibold text-slate-700">
          {navItems.map((item) => (
            <button
              key={item.key}
              type="button"
              onClick={() => setActiveView(item.key)}
              className={`flex flex-col items-center justify-center gap-1 py-3 transition-colors ${
                activeView === item.key ? "text-sakura-700" : "text-slate-500"
              }`}
              aria-current={activeView === item.key ? "page" : undefined}
            >
              <span
                className={`h-9 w-9 rounded-full border grid place-items-center ${
                  activeView === item.key
                    ? "border-sakura-500 bg-sakura-50 text-sakura-700"
                    : "border-slate-200 bg-white"
                }`}
                aria-hidden
              >
                ●
              </span>
              {item.label}
            </button>
          ))}
        </div>
      </nav>
    </div>
  );
}
