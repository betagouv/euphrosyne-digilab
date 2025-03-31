'use client';

import { useContext } from 'react';

import {
  AboutSection,
  AboutSectionContent,
} from '../../src/components/index/AboutSection';
import {
  FigureSection,
  FigureSectionContent,
} from '../../src/components/index/FigureSection';
import { Hero, HeroContent } from '../../src/components/index/Hero';
import {
  HowItWorksSection,
  HowItWorksSectionContent,
} from '../../src/components/index/HowItWorksSection';
import {
  ProjectListSection,
  ProjectListSectionContent,
} from '../../src/components/index/ProjectListSection';
import {
  SearchSection,
  SearchSectionContent,
} from '../../src/components/index/SearchSection';
import { LangContext } from '../../src/contexts/LangContext';

export interface IndexPageContent {
  hero: HeroContent;
  search: SearchSectionContent;
  howItWorks: HowItWorksSectionContent;
  about: AboutSectionContent;
  figure: FigureSectionContent;
  projectList: ProjectListSectionContent;
}

// In Next.js App Router, data fetching will work differently
// We'll add server-side data loading in a separate function
export default function HomePage({ params }: { params: { locale: string } }) {
  const { translations } = useContext(LangContext);
  const content = translations.indexPageContent;

  // In the real implementation, these would be passed as props from the
  // server component using getStaticProps
  const stats = { 
    all: { totalProjects: 100, totalObjectGroups: 200, totalHours: 5000 },
    year: { totalProjects: 20, totalObjectGroups: 50, totalHours: 1000 }
  };
  const lastProjects = [];
  
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
          projects={lastProjects}
          content={content.projectList}
        />
      )}
    </>
  );
}

// This would be implemented in a real migration:
export async function generateStaticParams() {
  return [
    { locale: 'en' },
    { locale: 'fr' },
  ];
}