import { useState, useEffect } from "react";

export default function usePagination(page?: number) {
  const [currentPage, setCurrentPage] = useState<number>(
    page || getCurrentPageFromURL() || 1
  );

  useEffect(() => {
    const page = getCurrentPageFromURL();
    if (page !== currentPage) {
      if (page === null) {
        window.history.pushState({}, "", getUrlForPage(1).toString());
      }
      setCurrentPage(page || 1);
    }
  }, [window.location.search]);

  return currentPage;
}

export function getCurrentPageFromURL(): number | null {
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
