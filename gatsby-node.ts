import type { GatsbyNode } from "gatsby";
import {
  writeGraphQLConfig,
  writeGraphQLFragments,
  writeGraphQLSchema,
} from "gatsby/dist/utils/graphql-typegen/file-writes";
import path from "path";
import slugify from "slugify";

import { SearchItem } from "./src/types/catalog";

export const createPages: GatsbyNode["createPages"] = async ({
  graphql,
  actions,
}) => {
  const { data }: { data?: Queries.CreatePagesFromProjectsQuery } =
    await graphql(`
      query CreatePagesFromProjects {
        euphrosyneAPI {
          lastProjects(limit: 6) {
            name
            slug
            comments
            created
            objectGroups {
              id
              label
              materials
              created
            }
          }
        }
      }
    `);

  const searchItems: SearchItem[] = [];
  const objectGroupIdsOfPages: string[] = [];

  data?.euphrosyneAPI.lastProjects?.forEach((project) => {
    if (!project || !project.objectGroups) return;
    const { name, slug, objectGroups, comments, created } = project;
    actions.createPage({
      path: `/project/${slug}`,
      component: path.resolve(`./src/templates/project.tsx`),
      context: { slug: slug },
    });
    searchItems.push({
      project: { name, slug, comments, created },
      type: "Project",
    });
    objectGroups.forEach((objectGroup) => {
      if (!objectGroup) return;
      const { id, label, materials, created } = objectGroup;
      if (objectGroupIdsOfPages.includes(`${label}|${id}`)) return; // page already created
      objectGroupIdsOfPages.push(`${label}|${id}`);
      const objectSlug = slugify(label);
      actions.createPage({
        path: `/object/${objectSlug}/${id}`,
        component: path.resolve(`./src/templates/object.tsx`),
        context: { id },
      });
      searchItems.push({
        objectGroup: { id, label, materials, created },
        type: "ObjectGroup",
      });
    });
  });

  actions.createPage({
    path: `/catalog`,
    component: path.resolve(`./src/templates/catalog.tsx`),
    context: { searchItems },
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
