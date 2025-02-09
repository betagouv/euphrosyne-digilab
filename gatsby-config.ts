import dotenv from "dotenv";
import type { GatsbyConfig } from "gatsby";

dotenv.config({
  path: `.env.${process.env.NODE_ENV}`,
});

const config: GatsbyConfig = {
  siteMetadata: {
    title: `Catalogue des données de New AGLAE`,
    siteUrl: process.env.SITE_URL,
  },
  // More easily incorporate content into your pages through automatic TypeScript type generation and better GraphQL IntelliSense.
  // If you use VSCode you can also use the GraphQL plugin
  // Learn more at: https://gatsby.dev/graphql-typegen
  graphqlTypegen: {
    generateOnBuild: process.env.TYPEGEN_ON_BUILD === "true",
  },
  plugins: [
    "gatsby-plugin-emotion",
    "gatsby-plugin-image",
    "gatsby-plugin-sitemap",
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        icon: "./public/dsfr/favicon/favicon.svg", // make sure to have run copy-dsfr-to-public (automatically run on npm install)
      },
    },
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "images",
        path: "./src/images/",
      },
      __key: "images",
    },
    {
      resolve: "gatsby-source-graphql",
      options: {
        typeName: "EuphrosyneAPI",
        fieldName: "euphrosyneAPI",
        url: process.env.GATSBY_EUPHROSYNE_HOST + "/graphql",
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `content`,
        path: `${__dirname}/src/content`,
      },
    },
    `gatsby-transformer-remark`,
    `gatsby-plugin-layout`,
    {
      resolve: `opensearch-source-plugin`,
      options: {
        openSearch: {
          host: process.env.ELASTICSEARCH_CONNECTION_URL,
        },
        eros: {
          enabled: process.env.EROS_ENABLED === "true",
          apiToken: process.env.EROS_API_TOKEN,
        },
      },
    },
    {
      resolve: "@sentry/gatsby",
      options: {
        dsn: process.env.GATSBY_SENTRY_DSN,
      },
    },
  ],
};

export default config;
