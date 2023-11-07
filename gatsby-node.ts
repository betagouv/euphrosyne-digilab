import type { GatsbyNode } from "gatsby";
import { EuphrosyneAPIQuery } from "./src/types/queries";
import path from "path";
import slugify from "slugify";
import { ObjectGroup, Project } from "./src/types/project";

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

  const searchItems: (Project | ObjectGroup)[] = [];
  let objectGroupIdsOfPages: string[] = [];

  data?.euphrosyneAPI.lastProjects.forEach((project: Project) => {
    const { slug, objectGroups } = project;
    actions.createPage({
      path: `/project/${slug}`,
      component: path.resolve(`./src/templates/project.tsx`),
      context: { slug: slug },
    });
    searchItems.push(project);
    objectGroups.forEach((objectGroup) => {
      const { id, label } = objectGroup;
      if (objectGroupIdsOfPages.includes(`${label}|${id}`)) return; // page already created
      objectGroupIdsOfPages.push(`${label}|${id}`);
      const objectSlug = slugify(label);
      actions.createPage({
        path: `/object/${objectSlug}/${id}`,
        component: path.resolve(`./src/templates/object.tsx`),
        context: { id },
      });
      searchItems.push(objectGroup);
    });
  });

  actions.createPage({
    path: `/catalogue`,
    component: path.resolve(`./src/templates/catalogue.tsx`),
    context: { searchItems },
  });
};
