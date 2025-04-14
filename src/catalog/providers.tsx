"use client";

import { useEffect, useState } from "react";
import { CatalogContext } from "./CatalogContext";
import { CatalogViewMode, SortValue } from "@/types/catalog";
import useSearch, {
  buildFiltersSearchParams,
  Filters,
} from "@/opensearch/useSearch";
import usePagination from "./hooks/usePagination";
import { useSearchParams } from "next/navigation";

export function CatalogProviders({ children }: { children: React.ReactNode }) {
  const [selectedSort, setSelectedSort] = useState<SortValue>("default");
  const searchParams = useSearchParams();
  const [filters, setFilters] = useState<Filters>(
    buildFiltersSearchParams(searchParams)
  );
  const [viewMode, setViewMode] = useState<CatalogViewMode>("list");

  const searchResult = useSearch(filters, selectedSort);

  const currentPage = usePagination();

  useEffect(() => {
    const from = filters.size * (currentPage - 1);
    if (from !== filters.from) {
      setFilters({ ...filters, from });
    }
  }, [currentPage, filters]);

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
