import { type GatsbyNode } from "gatsby";

import { NODE_TYPES } from "./constants";

export const createSchemaCustomization: GatsbyNode[`createSchemaCustomization`] =
  ({ actions }) => {
    const { createTypes } = actions;

    const projectTypes = `
      type ${NODE_TYPES.Project} implements Node {
        category: String!
        slug: String!
        name: String!
        created: Date!
        discoveryPlacePoints: [${NODE_TYPES.Project}DiscoveryPlacePoints]
        materials: [String]
        dataAvailable: Boolean!
        comments: String
        projectPageData: ${NODE_TYPES.Project}ProjectPageData!
        status: String!
        pagePath: String!
      }

      type ${NODE_TYPES.Project}ProjectPageData {
        leader: ${NODE_TYPES.Project}ProjectPageDataLeader!
        objectGroups: [${NODE_TYPES.Project}ProjectPageDataObjectGroups]
        runs: [${NODE_TYPES.Project}ProjectPageDataRuns]!
      }

      type ${NODE_TYPES.Project}ProjectPageDataLeader {
        firstName: String!
        lastName: String!
        institutionCountry: String
        institutionName: String
      }

      type ${NODE_TYPES.Project}ProjectPageDataObjectGroups {
        id: Int!
        label: String!
        collection: String
        discoveryPlaceLabel: String
        materials: [String!]
        c2rmfId: String
        discoveryPlaceLabel: String
        datingEraLabel: String
        datingPeriodLabel: String
        objects: [${NODE_TYPES.Project}ProjectPageDataObjectGroupsObjects]
      }

      type ${NODE_TYPES.Project}ProjectPageDataObjectGroupsObjects {
        label: String!
        collection: String!
        inventory: String
      }

      type ${NODE_TYPES.Project}DiscoveryPlacePoints {
        lat: Float!
        lon: Float!
      }

      type ${NODE_TYPES.Project}ProjectPageDataRuns {
        label: String!
        projectSlug: String!
      }

      type ${NODE_TYPES.Project}ObjectPageDataRuns {
        startDate: Date
        particleType: String
        energyInKev: String
        beamline: String
        methods: [${NODE_TYPES.Project}ObjectPageDataRunsMethods!]
      }

      type ${NODE_TYPES.Project}ObjectPageDataRunsMethods {
        detectors: [${NODE_TYPES.Project}ObjectPageDataRunsMethodsFilters!]
        name: String!
      }

      type ${NODE_TYPES.Project}ObjectPageDataRunsMethodsFilters {
        filters: [String!]
      }
    `;

    const objectGroupTypes = `
      type ${NODE_TYPES.ObjectGroup} implements Node {
        category: String!
        created: Date!
        materials: [String!]
        name: String!
        slug: String!
        dataAvailable: Boolean!
        c2rmfId: String
        objectPageData: ${NODE_TYPES.ObjectGroup}ObjectPageData!
        pagePath: String!
        discoveryPlaceLabel: String
        collection: String
        inventoryNumber: String
      }

      type ${NODE_TYPES.ObjectGroup}ObjectPageData {
        projects: [${NODE_TYPES.ObjectGroup}ObjectPageDataProjects]!
        runs: [${NODE_TYPES.ObjectGroup}ObjectPageDataRuns]!
      }

      type ${NODE_TYPES.ObjectGroup}ObjectPageDataProjects {
        leader: ${NODE_TYPES.ObjectGroup}ObjectPageDataProjectsLeader
        name: String!
        slug: String!
      }

      type ${NODE_TYPES.ObjectGroup}ObjectPageDataProjectsLeader {
        firstName: String!
        lastName: String!
        institutionCountry: String
        institutionName: String
      }

      type ${NODE_TYPES.ObjectGroup}ObjectPageDataRuns {
        label: String!
        projectSlug: String!
      }

      type ${NODE_TYPES.ObjectGroup}ObjectPageDataRuns {
        startDate: Date
        particleType: String
        energyInKev: String
        beamline: String
        methods: [${NODE_TYPES.ObjectGroup}ObjectPageDataRunsMethods!]
      }

      type ${NODE_TYPES.ObjectGroup}ObjectPageDataRunsMethods {
        detectors: [${NODE_TYPES.ObjectGroup}ObjectPageDataRunsMethodsFilters!]
        name: String!
      }

      type ${NODE_TYPES.ObjectGroup}ObjectPageDataRunsMethodsFilters {
        filters: [String!]
      }

    `;

    const catalogItemTypes = `
      type CatalogItem implements Node {
        name: String!
        category: String!
        slug: String!
        created: Date!
        materials: [String!]
        pagePath: String!
        object: ${NODE_TYPES.ObjectGroup} @link
        project: ${NODE_TYPES.Project} @link
      }
    `;

    createTypes(projectTypes);
    createTypes(objectGroupTypes);
    createTypes(catalogItemTypes);
  };
