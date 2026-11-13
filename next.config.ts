import { withSentryConfig } from "@sentry/nextjs/config";

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    dangerouslyAllowSVG: true,
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.woff2$/,
      type: "asset/resource",
    });
    return config;
  },
  turbopack: {},
};

export default withSentryConfig(nextConfig, {
  // For all available options, see:
  // https://www.npmjs.com/package/@sentry/webpack-plugin#options

  org: "betagouv",
  project: "euphrosyne-digilab",
  sentryUrl: "https://sentry.incubateur.net/",

  // Only print logs for uploading source maps in CI
  silent: !process.env.CI,

  // For all available options, see:
  // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/

  // Upload a larger set of source maps for prettier stack traces (increases build time)
  widenClientFileUpload: true,

  // Uncomment to route browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers.
  // This can increase your server load as well as your hosting bill.
  // Note: Check that the configured route will not match with your Next.js middleware, otherwise reporting of client-
  // side errors will fail.
  // tunnelRoute: "/monitoring",

  // Automatically tree-shake Sentry logger statements to reduce bundle size
  bundleSizeOptimizations: {
    excludeDebugStatements: true,
  },
});
