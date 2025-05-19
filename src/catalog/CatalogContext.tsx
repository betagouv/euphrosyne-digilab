"use client";

import { SetStateAction, createContext } from "react";

import { Filters } from "@/opensearch/useSearch";
import { CatalogViewMode, SearchResults, SortValue } from "@/types/catalog";

export interface ICatalogContext {
  selectedSort: SortValue;
  setSelectedSort: React.Dispatch<SetStateAction<SortValue>>;
  filters: Filters;
  setFilters: (filters: Filters) => void;
  viewMode: CatalogViewMode;
  setViewMode: React.Dispatch<SetStateAction<CatalogViewMode>>;
  searchResult: SearchResults;
  currentPage: number;
}

export const CatalogContext = createContext<ICatalogContext>({
  selectedSort: "default",
  setSelectedSort: () => {},
  filters: { q: "", from: 0, size: 10 },
  setFilters: () => {},
  viewMode: "list",
  setViewMode: () => {},
  searchResult: { results: [], total: 0 },
  currentPage: 1,
});
