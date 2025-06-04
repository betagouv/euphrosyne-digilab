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

    // Construct a set of all keys from both current and new filters
    // because some keys might be in one but not the other
    // example : "isDataEmbargoed" is not present in the initial EMPTY_FILTERS
    const keys = new Set([...Object.keys(filters), ...Object.keys(newFilters)]);

    const hasNonFromFiltersChanged = [...keys].some((key) => {
      if (key === "from") return false;
      return (
        JSON.stringify(newFilters[key]) !==
        JSON.stringify(prevFiltersRef.current[key])
      );
    });

    const from = hasNonFromFiltersChanged ? 0 : newFilters.from;

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
