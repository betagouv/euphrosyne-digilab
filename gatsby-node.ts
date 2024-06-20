import type { GatsbyNode } from "gatsby";
import {
  writeGraphQLConfig,
  writeGraphQLFragments,
  writeGraphQLSchema,
} from "gatsby/dist/utils/graphql-typegen/file-writes";

import { defaultLangKey, langs, localizePath } from "./src/i18n";

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
