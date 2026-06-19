"use client";

import { usePathname, useRouter } from "next/navigation";
import { useMemo } from "react";

import { locales, type Locale } from "@/src/i18n/config";

type LocaleSwitcherProps = {
  locale: Locale;
  labels: Record<Locale, string>;
  className?: string;
  pillClassName?: string;
};

export function LocaleSwitcher({ locale, labels, className = "", pillClassName = "px-3 py-1 text-xs" }: LocaleSwitcherProps) {
  const router = useRouter();
  const pathname = usePathname();

  const currentLocale = useMemo(() => {
    if (!pathname) return locale;
    const parts = pathname.split("/").filter(Boolean);
    return locales.includes(parts[0] as Locale) ? (parts[0] as Locale) : locale;
  }, [locale, pathname]);

  const buildHref = (target: Locale) => {
    if (!pathname) return `/${target}`;
    const segments = pathname.split("/").filter(Boolean);
    if (locales.includes(segments[0] as Locale)) {
      segments[0] = target;
    } else {
      segments.unshift(target);
    }
    return `/${segments.join("/") || target}`;
  };

  const handleSelect = (target: Locale) => {
    const href = buildHref(target);
    if (href === pathname) return;
    router.push(href);
    router.refresh();
  };

  return (
    <div className={`flex items-center gap-2 uppercase tracking-wide text-slate-700 ${className}`}>
      {locales.map((code) => (
        <button
          key={code}
          type="button"
          onClick={() => handleSelect(code)}
          className={`rounded-full border transition-colors ${
            code === currentLocale
              ? "border-sakura-500 bg-sakura-100 text-sakura-700"
              : "border-slate-200 bg-white hover:border-sakura-400"
          } ${pillClassName}`}
          aria-pressed={code === currentLocale}
        >
          {labels[code] ?? code.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
