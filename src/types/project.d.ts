type ProjectStatus = "Status.FINISHED" | "Status.DATA_AVAILABLE";

type Project = {
  name: string;
  status: ProjectStatus;
  comments: string | null;
  slug: string;
  objectGroupMaterials: string[];
  objectGroups: ObjectGroup[];
};

type Participation = {
  user: User;
  institution?: Institution;
};

type User = {
  firstName: string;
  lastName: string;
};

type Institution = {
  name: string;
  country: string;
};

type DetailedObject = {
  label: string;
  collection: string | null;
};

type ObjectGroup = {
  id: string;
  c2rmfId: string | null;
  label: string;
  materials: string[];
  discoveryPlace: string | null;
  collection: string | null;
  dating: string | null;
  objectSet: DetailedObject[];
  dataAvailable?: boolean;
};
