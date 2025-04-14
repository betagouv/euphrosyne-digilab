import { fr } from "@codegouvfr/react-dsfr";
import React, { useContext } from "react";
import { useRouter } from "next/navigation";

import { ContentProps } from "../../i18n";
import { getUrlForPage } from "../hooks/usePagination";
import { CatalogContext } from "../CatalogContext";

export interface PaginationContent {
  firstPage: string;
  previousPage: string;
  nextPage: string;
  lastPage: string;
}

interface PaginationProps
  extends Omit<React.HTMLAttributes<HTMLElement>, "content"> {
  currentPage: number;
  pageCount: number;
}

export function Pagination({
  currentPage,
  pageCount,
  className,
  content,
  ...props
}: PaginationProps & ContentProps<PaginationContent>) {
  const router = useRouter();
  const { setFilters, filters } = useContext(CatalogContext);
  
  const handlePageChange = (page: number) => {
    // Early return if trying to navigate outside valid range
    if (page < 1 || page > pageCount) return;
    
    // Update URL
    const url = getUrlForPage(page);
    router.push(url.pathname + url.search);
    
    // Update filters directly
    const from = filters.size * (page - 1);
    setFilters({ ...filters, from });
  };
  
  const visiblePages = Array.from(
    new Set(
      [
        currentPage - 2,
        currentPage - 1,
        currentPage,
        currentPage + 1,
        currentPage + 2,
        pageCount - 1,
        pageCount,
      ].filter((page) => page > 0 && page <= pageCount)
    )
  );
  
  return (
    <nav
      role="navigation"
      className={[fr.cx("fr-pagination"), className].join(" ")}
      aria-label="Pagination"
      {...props}
    >
      <ul className="fr-pagination__list">
        <li>
          <a
            className="fr-pagination__link fr-pagination__link--first"
            aria-disabled="true"
            role="link"
            href="#"
            onClick={(e) => {
              e.preventDefault();
              handlePageChange(1);
            }}
          >
            {content.firstPage}
          </a>
        </li>
        <li>
          <a
            className="fr-pagination__link fr-pagination__link--prev fr-pagination__link--lg-label"
            aria-disabled={currentPage <= 1}
            role="link"
            href="#"
            onClick={(e) => {
              e.preventDefault();
              if (currentPage > 1) handlePageChange(currentPage - 1);
            }}
          >
            {content.previousPage}
          </a>
        </li>
        {visiblePages.map((page, index, array) => {
          const ariaCurent: { "aria-current": "page" | undefined } = {
            "aria-current": page === currentPage ? "page" : undefined,
          };
          return (
            <React.Fragment key={`pagination-fragment-${index}`}>
              {index > 0 && page - array[index - 1] > 1 && (
                <li key={`pagination-ellipsis-${index}`}>
                  <a className="fr-pagination__link fr-displayed-lg">…</a>
                </li>
              )}
              <li key={`pagination-${page}`}>
                <a
                  className="fr-pagination__link"
                  title={"Page " + page}
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    handlePageChange(page);
                  }}
                  {...ariaCurent}
                >
                  {page}
                </a>
              </li>
            </React.Fragment>
          );
        })}
        <li>
          <a
            className="fr-pagination__link fr-pagination__link--next fr-pagination__link--lg-label"
            aria-disabled={currentPage === pageCount}
            role="link"
            href="#"
            onClick={(e) => {
              e.preventDefault();
              if (currentPage < pageCount) handlePageChange(currentPage + 1);
            }}
          >
            {content.nextPage}
          </a>
        </li>
        <li>
          <a
            className="fr-pagination__link fr-pagination__link--last"
            href="#"
            aria-disabled={currentPage === pageCount}
            role="link"
            onClick={(e) => {
              e.preventDefault();
              handlePageChange(pageCount);
            }}
          >
            {content.lastPage}
          </a>
        </li>
      </ul>
    </nav>
  );
}
