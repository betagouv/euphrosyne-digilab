export interface SearchItem {
  type: "ObjectGroup" | "Project";
  project?: { name: string; slug: string; comments: string; created: string };
  objectGroup?: {
    id: string;
    label: string;
    materials: readonly string[];
    created: string;
  };
}
