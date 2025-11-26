import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  // Provide an explicit Turbopack config to silence warnings when running `next dev`.
  turbopack: {},
  webpack(config, { dev }) {
    if (dev) {
      config.devtool = false;
    }
    return config;
  },
};

export default nextConfig;
