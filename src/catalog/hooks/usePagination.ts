import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const isBrowser = typeof window !== "undefined";

export default function usePagination(page?: number) {
  const searchParams = useSearchParams();
  const pageFromUrl = searchParams ? searchParams.get("page") : null;
  
  // Use URL page parameter or fallback to provided page or 1
  const [currentPage, setCurrentPage] = useState<number>(
    page || (pageFromUrl ? parseInt(pageFromUrl) : 1)
  );

  // Update page when URL changes
  useEffect(() => {
    if (pageFromUrl) {
      const newPage = parseInt(pageFromUrl);
      if (newPage !== currentPage) {
        setCurrentPage(newPage);
      }
    } else if (currentPage !== 1) {
      // If no page in URL, set to page 1
      setCurrentPage(1);
    }
  }, [pageFromUrl, searchParams]);

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
