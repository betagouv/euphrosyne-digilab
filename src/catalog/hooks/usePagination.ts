import { useEffect, useState } from "react";

const isBrowser = typeof window !== "undefined";

export default function usePagination(page?: number) {
  const [currentPage, setCurrentPage] = useState<number>(
    page || getCurrentPageFromURL() || 1,
  );

  useEffect(() => {
    const page = getCurrentPageFromURL();
    if (page !== currentPage) {
      if (page === null) {
        window.history.pushState({}, "", getUrlForPage(1).toString());
      }
      setCurrentPage(page || 1);
    }
  }, [isBrowser ? window.location.search : null]);

  return currentPage;
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
