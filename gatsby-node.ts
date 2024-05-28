import type { GatsbyNode } from "gatsby";
import {
  writeGraphQLConfig,
  writeGraphQLFragments,
  writeGraphQLSchema,
} from "gatsby/dist/utils/graphql-typegen/file-writes";

import { defaultLangKey, langs } from "./src/i18n";

export const onCreatePage: GatsbyNode["onCreatePage"] = async ({
  page,
  actions,
}) => {
  actions.deletePage(page);

  langs.forEach((lang) => {
    actions.createPage({
      ...page,
      path: `/${lang}${page.path}`,
      context: {
        ...page.context,
        langKey: lang,
      },
    });
  });

  actions.createRedirect({
    fromPath: `${page.path}`,
    toPath: `/${defaultLangKey}/${page.path}`,
  });
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
