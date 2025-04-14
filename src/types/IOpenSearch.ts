export interface SearchHit {
  _source: IOpenSearchDocument;
}

export interface IOpenSearchDocument
  extends IBaseDocument,
    IBaseProjectDocument,
    IBaseObjectDocument {}

interface ILeader {
  user_first_name: string;
  user_last_name: string;
  institution_name: string;
  institution_country: string;
}

interface IThumbnail {
  url: string;
  copyright: string;
}

interface IBaseDocument {
  id: string;
  category: "object" | "project";
  name: string;
  slug: string;
  created: string;
  materials: string[];
  is_data_available: boolean;
  thumbnail: IThumbnail | null;
}

interface IBaseProjectDocument {
  comments: string;
  status: string;
  discovery_place_points: {
    lat: number;
    lon: number;
  }[];
  project_page_data: IProjectPageData;
}

interface IBaseObjectDocument {
  object_page_data: IObjectPageData;
  c2rmf_id?: string | null;
  discovery_place_label: string;
  discovery_place_point: {
    lat: number;
    lon: number;
  };
  collection: string;
  inventory_number: string;
  dating_era_label: string;
  dating_era_theoso_huma_num_id: string;
  dating_era_theoso_huma_num_parent_ids: string[];
  dating_period_label: string;
  dating_period_theoso_huma_num_id: string;
  dating_period_theoso_huma_num_parent_ids: string[];
  objects?: {
    label: string;
    collection: string;
    inventory: string;
  }[];
  collections: string[];
  inventory_numbers: string[];
}

interface IProjectPageData {
  leader: ILeader;
  runs: IRun[];
  object_groups: {
    id: string;
    c2rmf_id?: string;
    label: string;
    materials: string[];
    discovery_place_label?: string;
    collection: string;
    dating_era_label?: string;
    dating_period_label?: string;
    objects?: {
      label: string;
      collection: string;
      inventory?: string;
    }[];
  }[];
}

interface IObjectPageData {
  runs: IRun[];
  projects: {
    name: string;
    slug: string;
    leader: ILeader;
  }[];
}

export interface IRun {
  id: string;
  label: string;
  start_date?: string;
  particle_type: string;
  energy_in_kev: string;
  beamline: string;
  project_slug: string;
  is_data_embargoed: boolean;
  methods: {
    name: string;
    detectors: {
      name: string;
      filters: string[];
    }[];
  }[];
}
