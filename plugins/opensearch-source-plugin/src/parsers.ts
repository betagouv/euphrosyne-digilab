import {
  IBaseItem,
  IObjectGroupItem,
  IObjectPageData,
  IProjectItem,
  IProjectPageData,
} from "../../../types/ICatalog";
import type { IOpenSearchDocument } from "../../../types/IOpenSearch";

export function parseProjectDocument(data: IOpenSearchDocument): IProjectItem {
  return {
    id: data.id,
    category: "project",
    name: data.name,
    slug: data.slug,
    created: new Date(data.created),
    materials: data.materials,
    comments: data.comments,
    status: data.status,
    discoveryPlacePoints: data.discovery_place_points,
    dataAvailable: data.is_data_available,
    projectPageData: parseProjectPageData(data.project_page_data),

    pagePath: `/${data.slug}/`,
  };
}

export function parseObjectDocument(
  data: IOpenSearchDocument,
): IObjectGroupItem {
  return {
    category: "object",
    ...parseCommonData(data),
    objectPageData: parseObjectPageData(data.object_page_data),
    c2rmfId: data.c2rmf_id || null,
    discoveryPlaceLabel: data.discovery_place_label,
    discoveryPlacePoint: data.discovery_place_point,
    collection: data.collection,
    inventoryNumber: data.inventory_number,
    datingLabel: data.dating_label,
    datingThesoHumaNumId: data.dating_theso_huma_num_id,
    datingThesoHumaNumParentIds: data.dating_theso_huma_num_parent_ids,
    objects: (data.objects || []).map((object) => {
      return {
        label: object.label,
        collection: object.collection,
        inventory: object.inventory,
      };
    }),
    collections: data.collections,
    inventoryNumbers: data.inventory_numbers,

    pagePath: `/${data.slug}/`,
  };
}

function parseCommonData(data: IOpenSearchDocument): IBaseItem {
  return {
    id: data.id,
    name: data.name,
    slug: data.slug,
    created: new Date(data.created),
    materials: data.materials,
    dataAvailable: data.is_data_available,
  };
}

function parseObjectPageData(
  data: IOpenSearchDocument["object_page_data"],
): IObjectPageData {
  return {
    runs: data.runs?.map((run) => {
      return {
        label: run.label,
        startDate: run.start_date ? new Date(run.start_date) : null,
        particleType: run.particle_type,
        energyInKev: run.energy_in_kev,
        beamline: run.beamline,
        projectSlug: run.project_slug,
        methods: run.methods?.map((method) => {
          return {
            name: method.name,
            detectors: method.detectors?.map((detector) => {
              return {
                name: detector.name,
                filters: detector.filters,
              };
            }),
          };
        }),
      };
    }),
    projects: data.projects.map((project) => {
      return {
        name: project.name,
        slug: project.slug,
        leader: {
          firstName: project.leader.user_first_name,
          lastName: project.leader.user_last_name,
          institutionName: project.leader.institution_name,
          institutionCountry: project.leader.institution_country,
        },
      };
    }),
  };
}

function parseProjectPageData(
  data: IOpenSearchDocument["project_page_data"],
): IProjectPageData {
  return {
    leader: {
      firstName: data.leader.user_first_name,
      lastName: data.leader.user_last_name,
      institutionName: data.leader.institution_name,
      institutionCountry: data.leader.institution_country,
    },
    runs: data.runs?.map((run) => {
      return {
        label: run.label,
        startDate: run.start_date ? new Date(run.start_date) : null,
        particleType: run.particle_type,
        energyInKev: run.energy_in_kev,
        beamline: run.beamline,
        projectSlug: run.project_slug,
        methods: run.methods?.map((method) => {
          return {
            name: method.name,
            detectors: method.detectors?.map((detector) => {
              return {
                name: detector.name,
                filters: detector.filters,
              };
            }),
          };
        }),
      };
    }),
    objectGroups: data.object_groups?.map((objectGroup) => {
      return {
        id: objectGroup.id,
        c2rmfId: objectGroup.c2rmf_id || null,
        label: objectGroup.label,
        materials: objectGroup.materials,
        discoveryPlaceLabel: objectGroup.discovery_place_label || null,
        collection: objectGroup.collection,
        datingLabel: objectGroup.dating_label || null,
        objects: (objectGroup.objects || []).map((object) => {
          return {
            label: object.label,
            collection: object.collection,
            inventory: object.inventory || null,
          };
        }),
      };
    }),
  };
}
