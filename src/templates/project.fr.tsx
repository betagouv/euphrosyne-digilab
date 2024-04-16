import { HeadFC, PageProps, graphql } from "gatsby";

import { BaseHead } from "../components/BaseHead";
import ProjectTemplate, {
  ProjectTemplateContent,
} from "../components/page-templates/project";
import {
  erosLinkText,
  pageBadges,
  projectDataContent,
  translations,
} from "../locales/fr";

const content: ProjectTemplateContent = {
  catalog: "Catalogue",
  projectData: "Données du projet",

  projectDataContent,
  projectDescription: {
    pageBadges: pageBadges,
    noDescription: "Pas de description pour ce projet.",
    addDataToCart: "Ajouter toutes les données au panier",
  },
  projectObjects: {
    projectObjects: "Objets du projet",
    noObjects: "Ce projet n'a pas d'objet enregistré.",
    seeObjectDetails: "Voir le détail de l'objet",
    seeMore: "Voir plus d'objets liés ({} restants) +",
    seeLess: "Voir moins -",
    erosLinkText,
    inventory: translations.inventory,
    period: translations.period,
    geographicArea: translations.geographicArea,
    materials: translations.materials,
  },
};

export default function ProjectTemplateFr(
  props: PageProps<Queries.ProjectTemplateQuery>,
) {
  return <ProjectTemplate content={content} {...props} />;
}

export const Head: HeadFC = BaseHead;

export const query = graphql`
  query ProjectTemplate($slug: String!) {
    euphrosyneAPI {
      projectDetail(slug: $slug) {
        name
        slug
        objectGroupMaterials
        comments
        status
        leader {
          user {
            firstName
            lastName
          }
          institution {
            name
            country
          }
        }
        runs {
          label
          startDate
          particleType
          energyInKev
          beamline
          methods {
            name
            detectors {
              name
              filters
            }
          }
        }
        objectGroups {
          id
          c2rmfId
          label
          materials
          discoveryPlace
          collection
          dating
          objectSet {
            label
            collection
          }
        }
      }
    }
  }
`;
