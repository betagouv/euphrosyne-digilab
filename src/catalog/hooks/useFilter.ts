import { useEffect, useState } from "react";

import { SearchItem } from "../../types/catalog";
import { Filters } from "../components/CatalogFilters";
import { SortValue } from "../components/SortSelect";

export function buildFiltersFromLocation(location: Location): Filters {
  const queryParams = new URLSearchParams(location.search);

  // Get the value of a query parameter
  const q = queryParams.get("q") || "";
  const objectGroupsSelected =
    (queryParams.get("objectGroupsSelected") || "true") === "true";
  const projectsSelected =
    (queryParams.get("projectsSelected") || "true") === "true";
  return {
    objectGroupsSelected,
    projectsSelected,
    q,
  };
}

export default function useFilter(
  searchItems: SearchItem[],
  filters: Filters,
  sort: SortValue = "dsc",
  location: Location,
) {
  const [filteredSearchItems, setFilteredSearchItems] = useState<SearchItem[]>(
    [],
  );
  const [lastLocation, setLastLocation] = useState<Location>(location);

  useEffect(() => {
    const searchItemArray = new SearchItemArray(...searchItems);
    setFilteredSearchItems(
      searchItemArray
        .sortByCreated(sort)
        .filterObjectTypeSelected(filters)
        .filterOnSearch(filters.q),
    );
    const searchParams = updateQueryParamsWithFilters(location, filters);
    const lastSearchParams = new URLSearchParams(
      new URL(lastLocation.href).search,
    );
    if (!searchParamsAreEqualWithoutPage(lastSearchParams, searchParams)) {
      // Reset the page number to 1 when the filters change
      searchParams.set("page", "1");
      const url = new URL(location.href);
      url.search = searchParams.toString();
      window.history.pushState({}, "", url);
      setLastLocation(location);
    }
  }, [searchItems, filters, sort]);

  return filteredSearchItems;
}

class SearchItemArray extends Array<SearchItem> {
  filterObjectTypeSelected({
    objectGroupsSelected,
    projectsSelected,
  }: Filters) {
    return new SearchItemArray(
      ...this.filter((item) => {
        if (item.category === "object") {
          return objectGroupsSelected;
        } else if (item.category === "project") {
          return projectsSelected;
        }
        return false;
      }),
    );
  }

  filterOnSearch(q: string) {
    return new SearchItemArray(
      ...this.filter((item) => {
        const filterValues = [];
        filterValues.push(item.name);
        if (item.category === "project") {
          filterValues.push(item.project?.comments || "");
        }
        return filterValues
          .map((value) => value.toLowerCase().includes(q.toLowerCase()))
          .includes(true);
      }),
    );
  }

  sortByCreated(sort: "asc" | "dsc" = "dsc") {
    return this.sort((a, b) => {
      const aCreated = new Date(a.created || new Date());
      const bCreated = new Date(b.created || new Date());
      return sort === "asc"
        ? aCreated.getTime() - bCreated.getTime()
        : bCreated.getTime() - aCreated.getTime();
    });
  }
}

function updateQueryParamsWithFilters(location: Location, filters: Filters) {
  const searchParams = new URLSearchParams(location.search);
  for (const key in filters) {
    let value = filters[key];
    if (value !== undefined) {
      value = value.toString();
      searchParams.set(key, value);
    }
  }
  return searchParams;
}

/**
 * Compares two URLSearchParams objects and checks if they are equal, excluding the "page" parameter.
 * This is useful for determining when only the page number has changed, thus avoiding setting page to 1.
 * @param searchParams1 - The first URLSearchParams object to compare.
 * @param searchParams2 - The second URLSearchParams object to compare.
 * @returns A boolean indicating whether the two URLSearchParams objects are equal without the "page" parameter.
 */
function searchParamsAreEqualWithoutPage(
  searchParams1: URLSearchParams,
  searchParams2: URLSearchParams,
) {
  const copy1 = new URLSearchParams(searchParams1.toString());
  const copy2 = new URLSearchParams(searchParams2.toString());
  copy1.delete("page");
  copy2.delete("page");
  return copy1.toString() === copy2.toString();
}
