import type { GatsbyNode } from "gatsby";
import { EuphrosyneAPIQuery } from "./src/types/queries";
import path from "path";
import slugify from "slugify";

export const createPages: GatsbyNode["createPages"] = async ({
  graphql,
  actions,
}) => {
  const { data }: { data?: EuphrosyneAPIQuery } = await graphql(`
    query createPagesFromProjects {
      euphrosyneAPI {
        lastProjects(limit: 6) {
          slug
          objectGroups {
            id
            label
          }
        }
      }
    }
  `);

  let objectGroupIdsOfPages: string[] = [];

  data?.euphrosyneAPI.lastProjects.forEach(
    ({ slug, objectGroups }: Project) => {
      actions.createPage({
        path: `/project/${slug}`,
        component: path.resolve(`./src/templates/project.tsx`),
        context: { slug: slug },
      });
      objectGroups.forEach(({ id, label }) => {
        if (objectGroupIdsOfPages.includes(`${label}|${id}`)) return; // page already created
        objectGroupIdsOfPages.push(`${label}|${id}`);
        const objectSlug = slugify(label);
        actions.createPage({
          path: `/object/${objectSlug}/${id}`,
          component: path.resolve(`./src/templates/object.tsx`),
          context: { id },
        });
      });
    }
  );
};
