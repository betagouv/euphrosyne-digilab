type ProjectStatus = "Status.FINISHED" | "Status.DATA_AVAILABLE";

type Project = {
  name: string;
  status: ProjectStatus;
  objectGroupLabels: string[];
  comments: string | null;
  slug: string;
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
  c2rmfId: string | null;
  label: string;
  materials: string[];
  discoveryPlace: string | null;
  collection: string | null;
  dating: string | null;
  objectSet: DetailedObject[];
};
