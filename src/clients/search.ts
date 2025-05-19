import { IItemCategory } from "@/types/ICatalog";

import type { SearchHit } from "../types/IOpenSearch";

export interface SearchProps {
  q?: string;
  materials?: string[];
  dating_period_ids?: string[];
  dating_era_ids?: string[];
  category?: IItemCategory;
  c2rmfId?: string;
  created_from?: string;
  created_to?: string;
  collection?: string;
  inventory?: string;
  location?: {
    top_left?: { lat: number; lon: number };
    bottom_right?: { lat: number; lon: number };
    top_right?: { lat: number; lon: number };
    bottom_left?: { lat: number; lon: number };
  };
  is_data_embargoed?: boolean;
  from?: number;
  size?: number;
  sort?: "asc" | "desc";
}

export type AggregatedField = "materials" | "created"; // Fields that can be aggregated

interface AggregationOpenSearchResponse<Key extends string, KeyType> {
  aggregations: {
    [key in Key]: {
      buckets: { key: KeyType; doc_count: number; key_as_string?: string }[];
    };
  };
}

interface SearchResponse {
  hits: {
    hits: SearchHit[];
    total: { value: number };
  };
}

export async function listAllProjects() {
  return (await listAllItems()).hits.hits.filter(
    (item) => item._source.category === "project",
  ) as SearchHit[];
}

export async function listAllObjects() {
  return (await listAllItems()).hits.hits.filter(
    (item) => item._source.category === "object",
  ) as SearchHit[];
}

async function listAllItems(): Promise<SearchResponse> {
  if (!process.env.NEXT_PUBLIC_EUPHROSYNE_HOST) {
    throw new Error("NEXT_PUBLIC_EUPHROSYNE_HOST env variable is not defined");
  }
  let response: Response;
  try {
    response = await fetch(
      `${process.env.NEXT_PUBLIC_EUPHROSYNE_HOST}/api/lab/catalog/list-all`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
  } catch (error) {
    throw new Error("Failed to fetch search results.\nError:\n" + error);
  }
  return (await response.json()) as SearchResponse;
}

export async function searchCatalog(
  filters: SearchProps,
): Promise<SearchResponse> {
  if (!process.env.NEXT_PUBLIC_EUPHROSYNE_HOST) {
    throw new Error("NEXT_PUBLIC_EUPHROSYNE_HOST env variable is not defined");
  }
  let response: Response;
  try {
    response = await fetch(
      `${process.env.NEXT_PUBLIC_EUPHROSYNE_HOST}/api/lab/catalog/search`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(filters),
      },
    );
  } catch (error) {
    throw new Error("Failed to fetch search results.\nError:\n" + error);
  }
  return (await response.json()) as SearchResponse;
}

export async function fetchAggregatedTags(
  field: AggregatedField,
  query?: string,
  exclude?: string[],
) {
  if (!process.env.NEXT_PUBLIC_EUPHROSYNE_HOST) {
    throw new Error("NEXT_PUBLIC_EUPHROSYNE_HOST env variable is not defined");
  }
  let url = `${process.env.NEXT_PUBLIC_EUPHROSYNE_HOST}/api/lab/catalog/aggregate`;
  url += `?field=${field}`;
  if (query) {
    url += `&query=${query}`;
  }
  if (exclude) {
    url += `&exclude=${exclude.join(",")}`;
  }
  let response;
  try {
    response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error(error);
    return [];
  }
  const tags = (await response.json()) as AggregationOpenSearchResponse<
    AggregatedField,
    string
  >;
  return tags.aggregations[field].buckets.map(({ key, doc_count }) => ({
    key,
    count: doc_count,
  }));
}

export async function fetchCreatedAggs() {
  if (!process.env.NEXT_PUBLIC_EUPHROSYNE_HOST) {
    throw new Error("NEXT_PUBLIC_EUPHROSYNE_HOST env variable is not defined");
  }
  const url = `${process.env.NEXT_PUBLIC_EUPHROSYNE_HOST}/api/lab/catalog/aggregate-created`;
  let response;
  try {
    response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error(error);
    return [];
  }
  const tags = (await response.json()) as AggregationOpenSearchResponse<
    "created",
    number
  >;
  return tags.aggregations.created.buckets.map(
    ({ key, doc_count, key_as_string }) => ({
      key,
      count: doc_count,
      keyAsString: key_as_string || key.toString(),
    }),
  );
}
