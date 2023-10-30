import * as React from "react";
import type { HeadFC, PageProps } from "gatsby";
import { graphql } from "gatsby";

import { Hero } from "../components/index/Hero";
import { SearchSection } from "../components/index/SearchSection";
import { HowItWorksSection } from "../components/index/HowItWorksSection";
import { AboutSection } from "../components/index/AboutSection";
import { FigureSection } from "../components/index/FigureSection";
import { Project } from "../types/project";
import { ProjectListSection } from "../components/index/ProjectListSection";
import { BaseHead } from "../components/BaseHead";
import BasePage from "../components/BasePage";

type DataProps = { euphrosyneAPI: { lastProjects: Project[] } };

const IndexPage: React.FC<PageProps<DataProps>> = ({ data, path }) => {
  return (
    <BasePage currentPath={path}>
      <Hero />
      <SearchSection />
      <HowItWorksSection />
      <AboutSection />
      <FigureSection />
      <ProjectListSection projects={data.euphrosyneAPI.lastProjects} />
    </BasePage>
  );
};

export default IndexPage;

export const Head: HeadFC = BaseHead;

export const query = graphql`
  query HomePageQuery {
    euphrosyneAPI {
      lastProjects(limit: 6) {
        name
        status
        objectGroupLabels
        comments
      }
    }
  }
`;
