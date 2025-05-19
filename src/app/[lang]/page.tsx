import { searchCatalog } from "@/clients/search";
import AboutSection, {
  AboutSectionContent,
} from "@/components/index/AboutSection";
import FigureSection, {
  FigureSectionContent,
} from "@/components/index/FigureSection";
import { Hero, HeroContent } from "@/components/index/Hero";
import {
  HowItWorksSection,
  HowItWorksSectionContent,
} from "@/components/index/HowItWorksSection";
import {
  ProjectListSection,
  ProjectListSectionContent,
} from "@/components/index/ProjectListSection";
import {
  SearchSection,
  SearchSectionContent,
} from "@/components/index/SearchSection";
import { parseProjectDocument } from "@/opensearch/parsers";
import { IProjectItem } from "@/types/ICatalog";

import { getTranslations } from "./dictionaries";
import { IPageParam } from "./types";
import { StartDsfrOnHydration } from "../../dsfr-bootstrap";

export { generateStaticParams } from "./static-params";

export interface IndexPageContent {
  hero: HeroContent;
  search: SearchSectionContent;
  howItWorks: HowItWorksSectionContent;
  about: AboutSectionContent;
  figure: FigureSectionContent;
  projectList: ProjectListSectionContent;
}

async function getLastProjects(): Promise<IProjectItem[]> {
  const res = await searchCatalog({ size: 5, category: "project" });
  return res.hits.hits.map((hit) => parseProjectDocument(hit._source));
}

const lastProjects = await getLastProjects();

export default async function Page({
  params,
}: {
  params: Promise<IPageParam>;
}) {
  const { lang } = await params;
  const translations = getTranslations(lang);
  const content = translations.indexPageContent;
  const { hero, search } = content;

  return (
    <>
      <StartDsfrOnHydration />
      <Hero content={hero} />
      <SearchSection content={search} />
      <HowItWorksSection content={content.howItWorks} />
      <AboutSection content={content.about} />
      <FigureSection content={content.figure} />
      {lastProjects && (
        <ProjectListSection
          projects={lastProjects}
          content={content.projectList}
          currentLang={lang}
        />
      )}
    </>
  );
}
