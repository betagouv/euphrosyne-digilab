import { useEffect, useState } from "react";

import {
  parseObjectDocument,
  parseProjectDocument,
} from "../../plugins/opensearch-source-plugin/src/parsers";
import { IObjectGroupItem, IProjectItem } from "../../types/ICatalog";
import { SortValue } from "../catalog/components/SortSelect";
import { SearchProps, searchCatalog } from "../clients/search";
import { SearchItem, SearchResults } from "../types/catalog";

export interface Filters {
  [key: string]: string | boolean | number | undefined | string[] | BoundingBox;
  objectGroupsSelected?: boolean;
  projectsSelected?: boolean;
  q: string;
  from: number;
  size: number;
  collection?: string;
  inventory?: string;
  materials?: string[];
  datingPeriodIds?: string[];
  datingEraIds?: string[];
  createdFromYear?: number;
  createdToYear?: number;
  isDataAvailable?: boolean;
  bBox?: BoundingBox;
}

interface GeoPoint {
  lat: number;
  lon: number;
}

export interface BoundingBox {
  topLeft?: GeoPoint;
  bottomRight?: GeoPoint;
  topRight?: GeoPoint;
  bottomLeft?: GeoPoint;
}

export default function useSearch(
  filters: Filters,
  sort: SortValue = "default",
  location: Location,
) {
  const [filteredSearchItems, setFilteredSearchItems] = useState<SearchResults>(
    { results: [], total: 0 },
  );
  const [lastLocation, setLastLocation] = useState<Location>(location);

  useEffect(() => {
    const {
      q,
      from,
      size,
      materials,
      datingEraIds,
      datingPeriodIds,
      collection,
      inventory,
      isDataAvailable,
    } = filters;
    let category: "object" | "project" | undefined;
    const locationFilter: SearchProps["location"] = {};

    let createdFrom: string | undefined = undefined,
      createdTo: string | undefined = undefined;

    if (filters.objectGroupsSelected && filters.projectsSelected) {
      category = undefined;
    } else if (filters.objectGroupsSelected) {
      category = "object";
    } else if (filters.projectsSelected) {
      category = "project";
    }

    if (filters.bBox) {
      locationFilter["top_left"] = filters.bBox.topLeft;
      locationFilter["bottom_right"] = filters.bBox.bottomRight;
      locationFilter["top_right"] = filters.bBox.topRight;
      locationFilter["bottom_left"] = filters.bBox.bottomLeft;
    }

    if (filters.createdFromYear) {
      createdFrom = `${filters.createdFromYear}-01-01T00:00:00.000Z`;
    }
    if (filters.createdToYear) {
      createdTo = `${filters.createdToYear}-12-31T23:59:59.999Z`;
    }

    doSearch({
      q,
      from,
      size,
      category,
      collection,
      inventory,
      materials,
      dating_era_ids: datingEraIds,
      dating_period_ids: datingPeriodIds,
      location: {
        top_left: filters.bBox?.topLeft,
        bottom_right: filters.bBox?.bottomRight,
      },
      created_from: createdFrom,
      created_to: createdTo,
      is_data_available: isDataAvailable,
      sort: sort === "default" ? undefined : sort,
    })
      .then((searchItems) => {
        setFilteredSearchItems(searchItems);
      })
      .catch((error) => {
        console.error(error);
        return;
      });
    const searchParams = updateQueryParamsWithFilters(location, filters);
    const lastSearchParams = new URLSearchParams(
      new URL(lastLocation.href).search,
    );
    if (
      !searchParamsAreEqualWithoutPagination(lastSearchParams, searchParams)
    ) {
      // Reset the page number to 1 when the filters change
      searchParams.set("page", "1");
      searchParams.set("from", "0");
    }
    const url = new URL(location.href);
    url.search = searchParams.toString();
    window.history.pushState({}, "", url);
    setLastLocation(location);
  }, [filters, sort]);

  return filteredSearchItems;
}

async function doSearch(filters: SearchProps): Promise<SearchResults> {
  const response = await searchCatalog(filters);
  const documents = response.hits.hits;

  const searchItems: SearchItem[] = [];
  documents.forEach((document) => {
    let project: IProjectItem | null = null,
      object: IObjectGroupItem | null = null,
      item: IProjectItem | IObjectGroupItem | null = null;
    if (document._source && document._source.category === "project") {
      project = parseProjectDocument(document._source);
    } else if (document._source && document._source.category === "object") {
      object = parseObjectDocument(document._source);
    }
    item = project || object;
    if (!item) return;
    const { name, pagePath, materials, category, slug, created } = item;
    searchItems.push({
      name,
      pagePath,
      materials,
      category,
      slug,
      created: created.toISOString(),
      project: project,
      object: object,
    });
  });
  return { results: searchItems, total: response.hits.total.value };
}

function valueIsValid(
  value: string | boolean | number | undefined | string[] | BoundingBox,
) {
  if (value === undefined) return false;
  if (typeof value === "string" && value === "") return false;
  if (Array.isArray(value) && value.length === 0) return false;
  return true;
}

function updateQueryParamsWithFilters(location: Location, filters: Filters) {
  const excludedFields = ["bBox", "periodIds"];
  const searchParams = new URLSearchParams(location.search);
  for (const key in filters) {
    let value = filters[key];
    if (value && valueIsValid(value) && !excludedFields.includes(key)) {
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
function searchParamsAreEqualWithoutPagination(
  searchParams1: URLSearchParams,
  searchParams2: URLSearchParams,
) {
  const copy1 = new URLSearchParams(searchParams1.toString());
  const copy2 = new URLSearchParams(searchParams2.toString());
  copy1.delete("from");
  copy1.delete("page");
  copy2.delete("from");
  copy2.delete("page");
  return copy1.toString() === copy2.toString();
}

export function buildFiltersFromLocation(location: Location): Filters {
  const queryParams = new URLSearchParams(location.search);

  // Get the value of a query parameter
  const q = queryParams.get("q") || "";
  const objectGroupsSelected =
    (queryParams.get("objectGroupsSelected") || "true") === "true";
  const projectsSelected =
    (queryParams.get("projectsSelected") || "true") === "true";
  const filters: Filters = {
    objectGroupsSelected,
    projectsSelected,
    q,
    size: 10,
    from: 0,
    materials: queryParams.get("materials")?.split(",") || [],
    createdFromYear:
      parseInt(queryParams.get("createdFromYear") || "") || undefined,
    createdToYear:
      parseInt(queryParams.get("createdToYear") || "") || undefined,
    isDataAvailable: !!queryParams.get("isDataAvailable") || undefined,
  };
  return filters;
}
