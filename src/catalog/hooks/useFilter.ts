import { useEffect, useState } from "react";

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
) {
  const [filteredSearchItems, setFilteredSearchItems] = useState<SearchItem[]>(
    [],
  );

  useEffect(() => {
    const searchItemArray = new SearchItemArray(...searchItems);
    setFilteredSearchItems(
      searchItemArray
        .sortByCreated(sort)
        .filterObjectTypeSelected(filters)
        .filterOnSearch(filters.q),
    );
    updateQueryParamsWithFilters(window.location, filters);
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
        if (item.type === "ObjectGroup") {
          return objectGroupsSelected;
        } else if (item.type === "Project") {
          return projectsSelected;
        }
        return false;
      }),
    );
  }

  filterOnSearch(q: string) {
    return new SearchItemArray(
      ...this.filter((item) => {
        let filterValues = [];
        if (item.project) {
          filterValues.push(item.project.name, item.project.comments);
        } else if (item.objectGroup) {
          filterValues.push(item.objectGroup.label);
        }
        return filterValues
          .map((value) => value.toLowerCase().includes(q.toLowerCase()))
          .includes(true);
      }),
    );
  }

  sortByCreated(sort: "asc" | "dsc" = "dsc") {
    return this.sort((a, b) => {
      const aCreated = new Date(
        a.objectGroup?.created || a.project?.created || new Date(),
      );
      const bCreated = new Date(
        b.objectGroup?.created || b.project?.created || new Date(),
      );
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
  searchParams.set("page", "1");
  const url = new URL(location.href);
  url.search = searchParams.toString();
  window.history.pushState({}, "", url);
}
