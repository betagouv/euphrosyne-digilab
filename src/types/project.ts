type ProjectStatus = "Status.FINISHED" | "Status.DATA_AVAILABLE";

interface Project {
  name: string;
  status: ProjectStatus;
  comments: string | null;
  slug: string;
  objectGroupMaterials: string[];
  objectGroups: ObjectGroup[];
}

interface Participation {
  user: User;
  institution?: Institution;
}

interface User {
  firstName: string;
  lastName: string;
}

interface Institution {
  name: string;
  country: string;
}

interface DetailedObject {
  label: string;
  collection: string | null;
}

interface ObjectGroup {
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

export { Project, Participation, User, Institution, ObjectGroup };
