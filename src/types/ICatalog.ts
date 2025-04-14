interface ILocation {
  lat: number;
  lon: number;
}

interface IObject {
  label: string;
  collection: string;
  inventory: string | null;
}

export interface IThumbnail {
  url: string;
  copyright: string;
}

export interface IDating {
  label: string;
  thesoHumaNumId?: string;
  thesoHumaNumParentIds?: string[];
}

export interface IObjectGroup {
  id: string;
  c2rmfId: string | null;
  label: string;
  materials: string[] | null;
  discoveryPlaceLabel: string | null;
  collection: string;
  datingEraLabel: string | null;
  datingPeriodLabel: string | null;
  objects: IObject[];
}

export interface ILeader {
  firstName: string;
  lastName: string;
  institutionName: string;
  institutionCountry: string;
}

interface IDetector {
  name: string;
  filters: string[];
}

interface IMethod {
  name: string;
  detectors: IDetector[];
}

export interface IRun {
  id: string;
  label: string;
  startDate: Date | null;
  particleType: string;
  energyInKev: string;
  beamline: string;
  methods: IMethod[];
  projectSlug: string;
  isDataEmbargoed: boolean;
}

interface IProject {
  name: string;
  slug: string;
  leader: ILeader;
}

export interface IProjectPageData {
  leader: ILeader;
  runs: IRun[];
  objectGroups: IObjectGroup[];
}

export interface IObjectPageData {
  runs: IRun[];
  projects: IProject[];
}

export interface ICatalogItem {
  id: string;
  slug: string;
  project?: string;
  object?: string;
}

export interface IBaseItem {
  id: string;
  name: string;
  slug: string;
  created: Date;
  materials: string[];
  dataAvailable: boolean;
  thumbnail: IThumbnail | null;
  placeholderImage: never | null;
}

export interface IProjectItem extends IBaseItem {
  category: "project";
  comments: string;
  status: string;
  discoveryPlacePoints: ILocation[];

  pagePath: string;

  projectPageData: IProjectPageData;
}

export interface IObjectGroupItem extends IBaseItem {
  category: "object";
  c2rmfId: string | null;
  discoveryPlaceLabel: string;
  discoveryPlacePoint: ILocation;
  collection: string;
  inventoryNumber: string;
  datingEra?: IDating;
  datingPeriod?: IDating;
  objects: IObject[];
  collections: string[];
  inventoryNumbers: string[];

  pagePath: string;

  objectPageData: IObjectPageData;
}
