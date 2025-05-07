"use client";

import { useRef, useState } from "react";

import useSearch, { EMPTY_FILTERS, Filters } from "@/opensearch/useSearch";
import { CatalogViewMode, SortValue } from "@/types/catalog";

import { CatalogContext } from "./CatalogContext";
import usePagination from "./hooks/usePagination";

export function CatalogProviders({ children }: { children: React.ReactNode }) {
  const [selectedSort, setSelectedSort] = useState<SortValue>("default");
  const [filters, _setFilters] = useState<Filters>(EMPTY_FILTERS);
  const [viewMode, setViewMode] = useState<CatalogViewMode>("list");
  const prevFiltersRef = useRef(filters);

  const setFilters = (newFilters: Filters) => {
    // Check if the filters have changed and if the "from" filter is not changed
    // If the "from" filter is not changed, keep it as is
    // Otherwise, set it to 0
    const hasNonFromFiltersChanged = Object.keys(filters).some((key) => {
      if (key === "from") return false;
      return (
        JSON.stringify(filters[key]) !==
        JSON.stringify(prevFiltersRef.current[key])
      );
    });

    const from = hasNonFromFiltersChanged ? 0 : filters.from;

    _setFilters({ ...newFilters, from });
  };

  const searchResult = useSearch(filters, selectedSort);

  const currentPage = usePagination(filters);

  const catalogContext = {
    selectedSort,
    setSelectedSort,
    filters,
    setFilters,
    viewMode,
    setViewMode,
    searchResult,
    currentPage,
  };

  return (
    <CatalogContext.Provider value={catalogContext}>
      {children}
    </CatalogContext.Provider>
  );
}
