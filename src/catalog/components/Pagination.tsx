import { Link } from "gatsby";
import React from "react";
import { getUrlForPage } from "../hooks/usePagination";
import { fr } from "@codegouvfr/react-dsfr";

interface PaginationProps extends React.HTMLAttributes<HTMLElement> {
  currentPage: number;
  pageCount: number;
}

export function Pagination({
  currentPage,
  pageCount,
  className,
  ...props
}: PaginationProps) {
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
          <Link
            className="fr-pagination__link fr-pagination__link--first"
            aria-disabled="true"
            role="link"
            to={getLinkForPage(1)}
          >
            Première page
          </Link>
        </li>
        <li>
          <Link
            className="fr-pagination__link fr-pagination__link--prev fr-pagination__link--lg-label"
            aria-disabled={currentPage <= 1}
            role="link"
            to={getLinkForPage(currentPage - 1)}
          >
            Page précédente
          </Link>
        </li>
        {visiblePages.map((page, index, array) => {
          const ariaCurent: { "aria-current": "page" | undefined } = {
            "aria-current": page === currentPage ? "page" : undefined,
          };
          return (
            <>
              {index > 0 && page - array[index - 1] > 1 && (
                <li>
                  <a className="fr-pagination__link fr-displayed-lg">…</a>
                </li>
              )}
              <li>
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
            Page suivante
          </Link>
        </li>
        <li>
          <Link
            className="fr-pagination__link fr-pagination__link--last"
            to={getLinkForPage(currentPage + 1)}
            aria-disabled={currentPage === pageCount}
            role="link"
          >
            Dernière page
          </Link>
        </li>
      </ul>
    </nav>
  );
}
