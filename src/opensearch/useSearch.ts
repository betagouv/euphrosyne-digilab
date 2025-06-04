import { useEffect, useState } from "react";

import { SortValue } from "@/types/catalog";
import { IObjectGroupItem, IProjectItem } from "@/types/ICatalog";

import { parseObjectDocument, parseProjectDocument } from "./parsers";
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
  isDataEmbargoed?: boolean;
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

export const EMPTY_FILTERS: Filters = {
  objectGroupsSelected: true,
  projectsSelected: true,
  q: "",
  size: 10,
  from: 0,
  materials: [],
};

export default function useSearch(
  filters: Filters,
  sort: SortValue = "default",
) {
  const [filteredSearchItems, setFilteredSearchItems] = useState<SearchResults>(
    { results: [], total: 0 },
  );

  const [previousFrom, setPreviosFrom] = useState(
    filters.from / filters.size + 1,
  );

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
      isDataEmbargoed,
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

    let updatedFrom = 0;
    if (from !== previousFrom) {
      updatedFrom = filters.from;
      setPreviosFrom(updatedFrom);
    }

    const requestFilters: SearchProps = {
      q,
      from: updatedFrom,
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
      sort: sort === "default" ? undefined : sort,
    };

    if (isDataEmbargoed === false) {
      requestFilters.is_data_embargoed = false;
    }

    doSearch(requestFilters)
      .then((searchItems) => {
        setFilteredSearchItems(searchItems);
      })
      .catch((error) => {
        console.error(error);
        return;
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
      ...project,
      ...object,
      name,
      pagePath,
      materials,
      category,
      slug,
      created: created,
    } as SearchItem);
  });
  return { results: searchItems, total: response.hits.total.value };
}

export function buildFiltersSearchParams(
  queryParams: URLSearchParams | null,
): Filters {
  if (!queryParams) {
    // Return default filters if searchParams is null
    return {
      objectGroupsSelected: true,
      projectsSelected: true,
      q: "",
      size: 10,
      from: 0,
      materials: [],
    };
  }

  // Get the value of a query parameter
  const q = queryParams.get("q") || "";
  const objectGroupsSelected =
    (queryParams.get("objectGroupsSelected") || "true") === "true";
  const projectsSelected =
    (queryParams.get("projectsSelected") || "true") === "true";
  const pageParam = queryParams.get("page");
  const currentPage = pageParam ? parseInt(pageParam) : 1;
  const size = 10;

  const filters: Filters = {
    objectGroupsSelected,
    projectsSelected,
    q,
    size,
    from: size * (currentPage - 1),
    materials: queryParams.get("materials")?.split(",") || [],
    createdFromYear:
      parseInt(queryParams.get("createdFromYear") || "") || undefined,
    createdToYear:
      parseInt(queryParams.get("createdToYear") || "") || undefined,
    isDataEmbargoed: !!queryParams.get("isDataEmbargoed") || undefined,
  };
  return filters;
}
