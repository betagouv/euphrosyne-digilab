import { notFound } from "next/navigation";

import { listAllObjects, listAllProjects } from "@/clients/search";
import { ProjectDescriptionContent } from "@/components/project/ProjectDescription";
import { ProjectObjectsContent } from "@/components/project/ProjectObjects";
import { RunCardContent } from "@/components/run/RunCard";
import { StartDsfrOnHydration } from "@/dsfr-bootstrap";
import { langs } from "@/i18n";
import { SearchHit } from "@/types/IOpenSearch";

import ObjectPage from "./ObjectPage";
import ProjectPage from "./ProjectPage";
import { getTranslations } from "../../dictionaries";
import { IPageParam } from "../../types";

interface IProjectPageParams extends IPageParam {
  slug: string;
  itemType: string;
}

export interface ProjectTemplateContent {
  catalog: string;
  projectData: string;

  projectDescription: ProjectDescriptionContent;
  projectObjects: ProjectObjectsContent;
  runCard: RunCardContent;
}

export const generateStaticParams = async () => {
  try {
    const items = await listAllProjects();
    return items.flatMap((item) =>
      langs.map((lang) => ({
        lang,
        slug: item._source.slug,
        itemType: getTranslations(lang)._system[item._source.category],
      })),
    );
  } catch (error) {
    console.error("Failed to generate project routes.", error);
    return [];
  }
};

async function getItem({ itemType, slug, lang }: IProjectPageParams) {
  const translations = getTranslations(lang);

  let listFn: () => Promise<SearchHit[]>;

  if (itemType === translations._system.project) {
    listFn = listAllProjects;
  } else if (itemType === translations._system.object) {
    listFn = listAllObjects;
  } else {
    throw new Error(`Unknown object type: ${itemType}`);
  }

  const items = await listFn();
  return items.find((item) => item._source.slug === slug)?._source || null;
}

export default async function CatalogItemPage({
  params,
}: {
  params: Promise<IProjectPageParams>;
}) {
  const awaitedParams = await params;
  const { lang } = awaitedParams;
  const item = await getItem(awaitedParams);

  if (!item) {
    return notFound();
  }

  return (
    <div>
      <StartDsfrOnHydration />
      {item.category === "project" && <ProjectPage item={item} lang={lang} />}
      {item.category === "object" && <ObjectPage item={item} lang={lang} />}
    </div>
  );
}
