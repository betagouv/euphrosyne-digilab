import * as React from "react";
import type { HeadFC, PageProps } from "gatsby";
import { graphql } from "gatsby";
import { DsfrProvider } from "@codegouvfr/react-dsfr/next-appdir/DsfrProvider";

import { StartDsfr } from "../StartDsfr";
import { EuphrosyneHeader } from "../components/EuphrosyneHeader";
import { Hero } from "../components/index/Hero";
import { SearchSection } from "../components/index/SearchSection";
import { HowItWorksSection } from "../components/index/HowItWorksSection";
import { AboutSection } from "../components/index/AboutSection";
import { FigureSection } from "../components/index/FigureSection";
import { Project } from "../types/project";
import { ProjectListSection } from "../components/index/ProjectListSection";

type DataProps = { euphrosyneAPI: { lastProjects: Project[] } };

const IndexPage: React.FC<PageProps<DataProps>> = ({ data, path }) => {
  return (
    <DsfrProvider lang={"fr"}>
      <EuphrosyneHeader currentPath={path} />
      <main>
        <Hero />
        <SearchSection />
        <HowItWorksSection />
        <AboutSection />
        <FigureSection />
        <ProjectListSection projects={data.euphrosyneAPI.lastProjects} />
      </main>
    </DsfrProvider>
  );
};

export default IndexPage;

export const Head: HeadFC = () => (
  <>
    <StartDsfr />
    <title>Euphrosyne Digilab</title>
    <link rel="apple-touch-icon" href="/dsfr/favicon/apple-touch-icon.png" />
    <link rel="icon" href="/dsfr/favicon/favicon.svg" type="image/svg+xml" />
    <link
      rel="shortcut icon"
      href="/dsfr/favicon/favicon.ico"
      type="image/x-icon"
    />
    <link
      rel="manifest"
      href="/dsfr/favicon/manifest.webmanifest"
      crossOrigin="use-credentials"
    />

    <link rel="stylesheet" href="/dsfr/utility/icons/icons.min.css" />
    <link rel="stylesheet" href="/dsfr/dsfr.min.css" />
  </>
);

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
