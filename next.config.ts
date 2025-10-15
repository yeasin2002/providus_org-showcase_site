import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  images: { remotePatterns: [] },
  typescript: {
    ignoreBuildErrors: process.env.NODE_ENV === "production",
  },

  // experimental: {
  //   typedRoutes: true,
  // },
};

export default withNextIntl(nextConfig);
