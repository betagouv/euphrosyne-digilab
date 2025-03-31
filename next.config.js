/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export", // Use Static Site Generation (SSG)
  reactStrictMode: true,
  images: {
    unoptimized: true, // Required for SSG export
  },
  // TODO: REMOVE ?
  // i18n: {
  //  locales: ["en", "fr"],
  //  defaultLocale: "en",
  // },
  async rewrites() {
    return [
      // Add any URL rewrites needed for backward compatibility
    ];
  },
  // Add environment variables that were previously in gatsby-config.ts
  env: {
    SITE_URL: process.env.SITE_URL,
    OPENSEARCH_CONNECTION_URL: process.env.ELASTICSEARCH_CONNECTION_URL,
    EROS_ENABLED: process.env.EROS_ENABLED,
    EROS_API_TOKEN: process.env.EROS_API_TOKEN,
  },
};

module.exports = nextConfig;
