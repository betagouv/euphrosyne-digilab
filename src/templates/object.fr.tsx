import { HeadFC, PageProps, graphql } from "gatsby";

import { BaseHead } from "../components/BaseHead";
import ObjectTemplate, {
  ObjectTemplateContent,
} from "../components/page-templates/object";

const content: ObjectTemplateContent = {
  catalog: "Catalogue",
  projectWithName: "Projet {}",
  altImageWithObjectName: "Image de l'objet {}",
  noProject: "Aucun projet",
  objectData: "Données de l'objet",
  project: "Projet",

  objectGroupDescription: {
    inventory: "Inventaire",
    period: "Époque",
    geographicArea: "Aire géographique",
    materials: "Matériaux",
    addObjectDataToCart: "Ajouter toutes les données de l'objet au panier",
    erosLinkText: "Fiche objet Eros",

    pageBadges: {
      project: "Projet",
      objectGroup: "Groupe d'objets",
    },
  },
  projectDataContent: {
    addToCart: "Ajouter les données au panier",
  },
};

export default function ObjectTemplateFr(
  props: PageProps<Queries.ObjectTemplateQuery>,
) {
  return <ObjectTemplate content={content} {...props} />;
}

export const Head: HeadFC = BaseHead;

export const query = graphql`
  query ObjectTemplate($id: String!) {
    euphrosyneAPI {
      objectGroupDetail(pk: $id) {
        id
        c2rmfId
        label
        materials
        discoveryPlace
        collection
        dating
        dataAvailable
        objectSet {
          label
          collection
        }
        runs {
          label
          startDate
          particleType
          energyInKev
          beamline
          project {
            name
            slug
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
          }
          methods {
            name
            detectors {
              name
              filters
            }
          }
        }
      }
    }
  }
`;
