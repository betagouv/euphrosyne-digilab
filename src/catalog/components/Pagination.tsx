import { fr } from "@codegouvfr/react-dsfr";
import { Link } from "gatsby";
import React from "react";

import { ContentProps } from "../../i18n";
import { getUrlForPage } from "../hooks/usePagination";

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
  const getLinkForPage = (page: number) => {
    const { pathname, search } = getUrlForPage(page);
    return pathname + search;
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
      ].filter((page) => page > 0 && page <= pageCount),
    ),
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
          <Link
            className="fr-pagination__link fr-pagination__link--first"
            aria-disabled="true"
            role="link"
            to={getLinkForPage(1)}
          >
            {content.firstPage}
          </Link>
        </li>
        <li>
          <Link
            className="fr-pagination__link fr-pagination__link--prev fr-pagination__link--lg-label"
            aria-disabled={currentPage <= 1}
            role="link"
            to={getLinkForPage(currentPage - 1)}
          >
            {content.previousPage}
          </Link>
        </li>
        {visiblePages.map((page, index, array) => {
          const ariaCurent: { "aria-current": "page" | undefined } = {
            "aria-current": page === currentPage ? "page" : undefined,
          };
          return (
            <>
              {index > 0 && page - array[index - 1] > 1 && (
                <li key="pagination-current">
                  <a className="fr-pagination__link fr-displayed-lg">…</a>
                </li>
              )}
              <li key={`pagination-${index}`}>
                <Link
                  className="fr-pagination__link"
                  title={"Page " + page}
                  to={getLinkForPage(page)}
                  {...ariaCurent}
                >
                  {page}
                </Link>
              </li>
            </>
          );
        })}
        <li>
          <Link
            className="fr-pagination__link fr-pagination__link--next fr-pagination__link--lg-label"
            aria-disabled={currentPage === pageCount}
            role="link"
            to={getLinkForPage(currentPage + 1)}
          >
            {content.nextPage}
          </Link>
        </li>
        <li>
          <Link
            className="fr-pagination__link fr-pagination__link--last"
            to={getLinkForPage(pageCount)}
            aria-disabled={currentPage === pageCount}
            role="link"
          >
            {content.lastPage}
          </Link>
        </li>
      </ul>
    </nav>
  );
}
