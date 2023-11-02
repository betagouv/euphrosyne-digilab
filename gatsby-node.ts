import type { GatsbyNode } from "gatsby";
import { EuphrosyneAPIQuery } from "./src/types/queries";
import path from "path";

type Person = {
  id: number;
  name: string;
  age: number;
};

export const createPages: GatsbyNode["createPages"] = async ({
  graphql,
  actions,
}) => {
  const { data }: { data?: EuphrosyneAPIQuery } = await graphql(`
    query createPagesFromProjects {
      euphrosyneAPI {
        lastProjects(limit: 6) {
          name
          status
          objectGroupLabels
          comments
          slug
        }
      }
    }
  `);
  data?.euphrosyneAPI.lastProjects.forEach(({ slug }) => {
    actions.createPage({
      path: `/project/${slug}`,
      component: path.resolve(`./src/templates/project.tsx`),
      context: { slug: slug },
    });
  });
};
