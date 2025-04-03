import type { GatsbyNode } from "gatsby";
import { FileSystemNode } from "gatsby-source-filesystem";
import {
  writeGraphQLConfig,
  writeGraphQLFragments,
  writeGraphQLSchema,
} from "gatsby/dist/utils/graphql-typegen/file-writes";

import { NODE_TYPES } from "./plugins/opensearch-source-plugin/src/constants";
import { defaultLangKey, langs, localizePath } from "./src/i18n";
import { deterministicItemSelector } from "./src/placeholder";

export const onCreatePage: GatsbyNode["onCreatePage"] = ({ page, actions }) => {
  if (
    ["dev-404-page", "/404/", "/404.html"].some((p) => page.path.includes(p))
  ) {
    return;
  }
  actions.deletePage(page);

  actions.createRedirect({
    fromPath: page.path,
    toPath: `/${defaultLangKey}${page.path}`,
    redirectInBrowser: true,
    isPermanent: true,
  });

  for (const lang of langs) {
    let path: string;
    if (page.path === "/") {
      path = `/${lang}/`;
    } else {
      path = localizePath(page.path, lang);
    }
    actions.createPage({
      ...page,
      path,
      context: {
        ...page.context,
        langKey: lang,
      },
    });
  }
};
// Generate GraphQL type definitions in .cache/typegen folders
// so we can use eslint with graphql in CI
export const onPostBuild: GatsbyNode["onPostBuild"] = async ({ store }) => {
  const { program, config, schema, definitions } = store.getState();

  if (
    process.env.gatsby_executing_command === `build` &&
    config.graphqlTypegen
  ) {
    await writeGraphQLConfig(program);
    await writeGraphQLSchema(program.directory, schema);
    await writeGraphQLFragments(program.directory, definitions);
  }
};

export const onCreateWebpackConfig: GatsbyNode["onCreateWebpackConfig"] = ({
  actions,
  getConfig,
}) => {
  const config = getConfig();
  if (config.mode !== "production") {
    actions.setWebpackConfig({
      watchOptions: {
        ignored: /node_modules/,
      },
    });
  }
};

export const onCreateNode: GatsbyNode["onCreateNode"] = async ({
  node,
  actions,
  getNodesByType,
}) => {
  const { createNodeField } = actions;
  if (
    ([NODE_TYPES.ObjectGroup, NODE_TYPES.Project] as string[]).includes(
      node.internal.type,
    )
  ) {
    const placeholderFiles = (
      getNodesByType("File") as FileSystemNode[]
    ).filter((file) => file.relativePath.startsWith("placeholders"));

    const randomPlaceholder = deterministicItemSelector(
      node.slug as string,
      placeholderFiles,
    );

    createNodeField({
      node,
      name: "placeholderImage",
      value: randomPlaceholder.id,
    });
  }
};

export const createSchemaCustomization: GatsbyNode[`createSchemaCustomization`] =
  ({ actions }) => {
    const { createTypes } = actions;

    const additionalTypes = `
      type ${NODE_TYPES.Project} implements Node {
        placeholderImage: File @link(from: "fields.placeholderImage")
      }

      type ${NODE_TYPES.ObjectGroup} implements Node {
        placeholderImage: File @link(from: "fields.placeholderImage")
      }

    `;

    createTypes(additionalTypes);
  };
