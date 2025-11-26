import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  i18n: {
    locales: ["vi", "en", "ja"],
    defaultLocale: "vi",
  },
};

export default nextConfig;
