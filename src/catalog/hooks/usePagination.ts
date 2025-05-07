import { Filters } from "@/opensearch/useSearch";

const isBrowser = typeof window !== "undefined";

function getPageFromFilters(filters: Filters): number {
  return filters.from / filters.size + 1;
}

export default function usePagination(filters: Filters) {
  // Simply return the calculated page number from filters
  // The page reset logic is handled in the Pagination component
  return getPageFromFilters(filters);
}

export function getCurrentPageFromURL(): number | null {
  if (!isBrowser) return 1;
  const page = new URLSearchParams(window.location.search).get("page");
  return page ? parseInt(page) : null;
}

export function getUrlForPage(page: number): URL {
  const newURL = new URL(window.location.href),
    searchParams = new URLSearchParams(newURL.search);
  searchParams.set("page", page.toString());
  newURL.search = searchParams.toString();
  return newURL;
}
