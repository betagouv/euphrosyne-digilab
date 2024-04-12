import type { PageProps } from "gatsby";
import * as React from "react";

import {
  AboutSection,
  AboutSectionContent,
} from "../components/index/AboutSection";
import {
  FigureSection,
  FigureSectionContent,
} from "../components/index/FigureSection";
import { Hero, HeroContent } from "../components/index/Hero";
import {
  HowItWorksSection,
  HowItWorksSectionContent,
} from "../components/index/HowItWorksSection";
import {
  ProjectListSection,
  ProjectListSectionContent,
} from "../components/index/ProjectListSection";
import {
  SearchSection,
  SearchSectionContent,
} from "../components/index/SearchSection";
import { Project } from "../types/project";

interface IndexPageContent {
  hero: HeroContent;
  search: SearchSectionContent;
  howItWorks: HowItWorksSectionContent;
  about: AboutSectionContent;
  figure: FigureSectionContent;
  projectList: ProjectListSectionContent;
}

interface IndexPageProps {
  content: IndexPageContent;
}

const IndexPage: React.FC<
  PageProps<Queries.HomePageQuery> & IndexPageProps
> = ({ data, content }) => {
  const { lastProjects, stats } = data.euphrosyneAPI;
  const { hero, search } = content;
  return (
    <>
      <Hero content={hero} />
      <SearchSection content={search} />
      <HowItWorksSection content={content.howItWorks} />
      <AboutSection content={content.about} />
      {stats && <FigureSection stats={stats} content={content.figure} />}
      {lastProjects && (
        <ProjectListSection
          projects={lastProjects as Project[]}
          content={content.projectList}
        />
      )}
    </>
  );
};

export default IndexPage;
