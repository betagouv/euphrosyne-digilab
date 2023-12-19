import type { HeadFC, PageProps } from "gatsby";
import { graphql } from "gatsby";
import * as React from "react";

import { BaseHead } from "../components/BaseHead";
import { AboutSection } from "../components/index/AboutSection";
import { FigureSection } from "../components/index/FigureSection";
import { Hero } from "../components/index/Hero";
import { HowItWorksSection } from "../components/index/HowItWorksSection";
import { ProjectListSection } from "../components/index/ProjectListSection";
import { SearchSection } from "../components/index/SearchSection";
import { Project } from "../types/project";

const IndexPage: React.FC<PageProps<Queries.HomePageQuery>> = ({ data }) => {
  const { lastProjects, stats } = data.euphrosyneAPI;
  return (
    <>
      <Hero />
      <SearchSection />
      <HowItWorksSection />
      <AboutSection />
      {stats && <FigureSection stats={stats} />}
      {lastProjects && (
        <ProjectListSection projects={lastProjects as Project[]} />
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
