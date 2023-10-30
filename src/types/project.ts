export type ProjectStatus = "Status.FINISHED" | "Status.DATA_AVAILABLE";

export type Project = {
  name: string;
  status: ProjectStatus;
  objectGroupLabels: string[];
  comments: string;
};
