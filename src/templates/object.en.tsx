import { HeadFC, PageProps, graphql } from "gatsby";

import { BaseHead } from "../components/BaseHead";
import ObjectTemplate, {
  ObjectTemplateContent,
} from "../components/page-templates/object";

const content: ObjectTemplateContent = {
  catalog: "Catalog",
  projectWithName: "Project {}",
  altImageWithObjectName: "Image of the object {}",
  noProject: "No project",
  objectData: "Object data",
  project: "Project",

  objectGroupDescription: {
    inventory: "Inventory",
    period: "Period",
    geographicArea: "Geographic area",
    materials: "Materials",
    addObjectDataToCart: "Add all object data to cart",
    erosLinkText: "Eros object page",

    pageBadges: {
      project: "Project",
      objectGroup: "Object group",
    },
  },
  projectDataContent: {
    addToCart: "Add data to cart",
  },
};

export default function ObjectTemplateEn(
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
