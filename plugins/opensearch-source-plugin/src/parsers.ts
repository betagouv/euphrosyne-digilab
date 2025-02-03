import type {
  IBaseItem,
  IDating,
  IObjectGroupItem,
  IObjectPageData,
  IProjectItem,
  IProjectPageData,
  IRun,
} from "../../../types/ICatalog";
import type {
  IRun as IDocumentRun,
  IOpenSearchDocument,
} from "../../../types/IOpenSearch";

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
    thumbnail: data.thumbnail,
    projectPageData: parseProjectPageData(data.project_page_data),

    pagePath: `/project/${data.slug}/`,
  };
}

export function parseObjectDocument(
  data: IOpenSearchDocument,
): IObjectGroupItem {
  let datingEra: IDating | undefined, datingPeriod: IDating | undefined;
  if (data.dating_era_label) {
    datingEra = {
      label: data.dating_era_label,
      thesoHumaNumId: data.dating_era_theoso_huma_num_id,
      thesoHumaNumParentIds: data.dating_era_theoso_huma_num_parent_ids,
    };
  }
  if (data.dating_period_label) {
    datingPeriod = {
      label: data.dating_period_label,
      thesoHumaNumId: data.dating_period_theoso_huma_num_id,
      thesoHumaNumParentIds: data.dating_period_theoso_huma_num_parent_ids,
    };
  }
  return {
    category: "object",
    ...parseCommonData(data),
    objectPageData: parseObjectPageData(data.object_page_data),
    c2rmfId: data.c2rmf_id || null,
    discoveryPlaceLabel: data.discovery_place_label,
    discoveryPlacePoint: data.discovery_place_point,
    collection: data.collection,
    inventoryNumber: data.inventory_number,
    datingEra,
    datingPeriod,
    objects: (data.objects || []).map((object) => {
      return {
        label: object.label,
        collection: object.collection,
        inventory: object.inventory,
      };
    }),
    collections: data.collections,
    inventoryNumbers: data.inventory_numbers,

    pagePath: `/object/${data.slug}/`,
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
    thumbnail: data.thumbnail,
  };
}

function parseObjectPageData(
  data: IOpenSearchDocument["object_page_data"],
): IObjectPageData {
  return {
    runs: data.runs?.map(parseRunData),
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
    runs: data.runs?.map(parseRunData),
    objectGroups: data.object_groups?.map((objectGroup) => {
      return {
        id: objectGroup.id,
        c2rmfId: objectGroup.c2rmf_id || null,
        label: objectGroup.label,
        materials: objectGroup.materials,
        discoveryPlaceLabel: objectGroup.discovery_place_label || null,
        collection: objectGroup.collection,
        datingEraLabel: objectGroup.dating_era_label || null,
        datingPeriodLabel: objectGroup.dating_period_label || null,
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

function parseRunData(run: IDocumentRun): IRun {
  return {
    id: run.id,
    label: run.label,
    startDate: run.start_date ? new Date(run.start_date) : null,
    particleType: run.particle_type,
    energyInKev: run.energy_in_kev,
    beamline: run.beamline,
    projectSlug: run.project_slug,
    isDataEmbargoed: run.is_data_embargoed,
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
}
