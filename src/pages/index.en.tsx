import type { HeadFC, PageProps } from "gatsby";
import { graphql } from "gatsby";
import * as React from "react";

import { BaseHead } from "../components/BaseHead";
import IndexPage from "../templates/index";

const content = {
  hero: {
    title: "Data produced by NewAglae available online",
    description: `Euphrosyne is the digital platform linked to NewAglae, 
    the Grand Louvre Accelerator for Elemental Analysis dedicated to heritage sciences.
    It allows the collection and dissemination of data
    as well as, for NewAglae users, remote access to
    software for processing ion beam analysis acquired
    on NewAglae. The NewAglae data catalog helps you
    search for scientific data by keywords (materials, date,
    geographical area, etc.) to best meet your research needs.`,
  },
  search: {
    title: {
      highlight: "Browse",
      rest: "our Euphrosyne data catalog",
    },
    featureSoon: "Feature coming soon...",
  },
  howItWorks: {
    title: "Euphrosyne's services",
    catalogText:
      "A catalog referencing the datasets produced by NewAglae since 04/01/2022.",
    euphrosyneText:
      "A digital platform allowing NewAglae users to prepare their experiments.",
    workplaceText:
      "A virtual office for NewAglae users to process and retrieve their data remotely.",
  },
  about: {
    title: "About",
    newAglae: "NewAglae, Grand Louvre Accelerator for Elemental Analysis",
    description: `AGLAE, acronym for "Grand Louvre Accelerator for Elemental Analysis," is a unique large instrument, located within
    the Louvre Palace itself. Since its installation in 1988, AGLAE is the
    only particle accelerator in the world dedicated to heritage sciences, using advanced techniques to decipher the
    secrets buried in works of art. Winner of the Future Investment from the National Research Agency (ANR-10-EQPX-22),
    AGLAE became NewAglae in 2017. Completely automated, the
    beam line is now likely to operate
    24/7.`,
    moreInfo: "Learn more",
    img1Alt: "Statuette from the Bavay bronze treasure analyzed by New AGLAÉ.",
    img2Alt: "Object analyzed by New AGLAÉ.",
  },
  figure: {
    title: "Key figures of NewAglae",
    analyzedProjectsLabel: "analysis projects carried out",
    analyzedObjectsLabel: "objects analyzed",
    hoursLabel: "hours",
    sinceYear: "Since {}",
    inYear: "In {}",
  },
  projectList: {
    title: "Latest Euphrosyne research projects",
  },
};
const FrIndexPage: React.FC<PageProps<Queries.HomePageQuery>> = (props) => {
  return <IndexPage {...props} content={content} />;
};

export default FrIndexPage;

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
