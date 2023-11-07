export type ProjectStatus = "Status.FINISHED" | "Status.DATA_AVAILABLE";

export interface Project {
  name: string;
  status: ProjectStatus;
  comments: string | null;
  slug: string;
  objectGroupMaterials: string[];
  objectGroups: ObjectGroup[];
}

export interface Participation {
  user: User;
  institution?: Institution;
}

export interface User {
  firstName: string;
  lastName: string;
}

export interface Institution {
  name: string;
  country: string;
}

export interface DetailedObject {
  label: string;
  collection: string | null;
}

export interface ObjectGroup {
  id: string;
  c2rmfId: string | null;
  label: string;
  materials: string[];
  discoveryPlace: string | null;
  collection: string | null;
  dating: string | null;
  objectSet: DetailedObject[];
  dataAvailable?: boolean;
}
