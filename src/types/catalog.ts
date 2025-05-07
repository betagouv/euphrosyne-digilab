import { Filters } from "@/opensearch/useSearch";

import { IObjectGroupItem, IProjectItem } from "./ICatalog";

export type SearchItem = IProjectItem | IObjectGroupItem;

export interface SearchResults {
  results: SearchItem[];
  total: number;
}

export type CatalogViewMode = "grid" | "list";

export type SortValue = "asc" | "desc" | "default";

export interface IIDImageMapping {
  [key: string]: string | undefined;
}

export interface FiltersProps {
  filters: Filters;
  setFilters: (filters: Filters) => void;
}
