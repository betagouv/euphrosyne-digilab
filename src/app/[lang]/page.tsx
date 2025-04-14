import { searchCatalog } from "@/clients/search";
import { StartDsfrOnHydration } from "../../dsfr-bootstrap";
import { Hero, HeroContent } from "@/components/index/Hero";
import {
  SearchSection,
  SearchSectionContent,
} from "@/components/index/SearchSection";
import {
  HowItWorksSection,
  HowItWorksSectionContent,
} from "@/components/index/HowItWorksSection";
import AboutSection, {
  AboutSectionContent,
} from "@/components/index/AboutSection";
import { FigureSectionContent } from "@/components/index/FigureSection";
import {
  ProjectListSection,
  ProjectListSectionContent,
} from "@/components/index/ProjectListSection";
import { getTranslations } from "./dictionaries";
import { IOpenSearchDocument } from "@/types/IOpenSearch";
import { IPageParam } from "./types";

export interface IndexPageContent {
  hero: HeroContent;
  search: SearchSectionContent;
  howItWorks: HowItWorksSectionContent;
  about: AboutSectionContent;
  figure: FigureSectionContent;
  projectList: ProjectListSectionContent;
}

async function getLastProjects() {
  const res = await searchCatalog({ size: 5, category: "project" });

  // By returning { props: { posts } }, the Blog component
  // will receive `posts` as a prop at build time
  return res.hits.hits.map((hit) => hit._source) as IOpenSearchDocument[];
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
      {lastProjects && (
        <ProjectListSection
          projects={lastProjects}
          content={content.projectList}
        />
      )}
    </>
  );
}
