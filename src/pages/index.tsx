import type { HeadFC, PageProps } from "gatsby";
import { graphql } from "gatsby";
import * as React from "react";
import { useContext } from "react";

import { BaseHead } from "../components/BaseHead";
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
import { LangContext } from "../contexts/LangContext";
import { Project } from "../types/project";

export interface IndexPageContent {
  hero: HeroContent;
  search: SearchSectionContent;
  howItWorks: HowItWorksSectionContent;
  about: AboutSectionContent;
  figure: FigureSectionContent;
  projectList: ProjectListSectionContent;
}

const IndexPage: React.FC<PageProps<Queries.HomePageQuery>> = ({ data }) => {
  const { translations } = useContext(LangContext);
  const content = translations.indexPageContent;

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

export const Head: HeadFC = BaseHead;

export const query = graphql`
  query HomePage {
    euphrosyneAPI {
      lastProjects(limit: 6) {
        name
        status
        objectGroupMaterials
        comments
        slug
      }
      stats {
        all {
          totalProjects
          totalObjectGroups
          totalHours
        }
        year {
          totalProjects
          totalObjectGroups
          totalHours
        }
      }
    }
  }
`;
