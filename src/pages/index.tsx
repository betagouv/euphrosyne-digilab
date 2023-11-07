import * as React from "react";
import type { HeadFC, PageProps } from "gatsby";
import { graphql } from "gatsby";

import { Hero } from "../components/index/Hero";
import { SearchSection } from "../components/index/SearchSection";
import { HowItWorksSection } from "../components/index/HowItWorksSection";
import { AboutSection } from "../components/index/AboutSection";
import { FigureSection } from "../components/index/FigureSection";
import { ProjectListSection } from "../components/index/ProjectListSection";
import { BaseHead } from "../components/BaseHead";

const IndexPage: React.FC<PageProps<Queries.HomePageQuery>> = ({
  data,
  path,
}) => {
  const { lastProjects } = data.euphrosyneAPI;
  return (
    <>
      <Hero />
      <SearchSection />
      <HowItWorksSection />
      <AboutSection />
      <FigureSection />
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
    }
  }
`;
