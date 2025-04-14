export type SearchItem =
  Queries.CatalogPageQuery["allCatalogItem"]["nodes"][number];

export interface SearchResults {
  results: SearchItem[];
  total: number;
}

export type CatalogViewMode = "grid" | "list";

export type SortValue = "asc" | "desc" | "default";

export interface IIDImageMapping {
  [key: string]: string | undefined;
}
