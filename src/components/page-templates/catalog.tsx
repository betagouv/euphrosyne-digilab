import { fr } from "@codegouvfr/react-dsfr";
import { css } from "@emotion/react";
import { useLocation } from "@reach/router";
import { HeadFC, PageProps } from "gatsby";
import { useState } from "react";

import CatalogFilters, {
  CatalogFiltersContent,
  Filters,
} from "../../catalog/components/CatalogFilters";
import { CatalogItem } from "../../catalog/components/CatalogItem";
import FilterContainer, {
  FilterContainerContent,
} from "../../catalog/components/FilterContainer";
import { Pagination } from "../../catalog/components/Pagination";
import SearchBarSection, {
  SearchBarContent,
} from "../../catalog/components/SearchBarSection";
import SortSelect, {
  SortSelectContent,
  SortValue,
} from "../../catalog/components/SortSelect";
import useFilter, {
  buildFiltersFromLocation,
} from "../../catalog/hooks/useFilter";
import usePagination from "../../catalog/hooks/usePagination";
import { ContentProps } from "../../i18n";
import { SearchItem } from "../../types/catalog";
import { BaseHead } from "../BaseHead";

export interface CatalogContent {
  noData: string;
  numResult: string;
  numResultPlural: string;

  searchBar: SearchBarContent;
  filterContainer: FilterContainerContent;
  catalogFilters: CatalogFiltersContent;
  sortSelect: SortSelectContent;
}

export interface CatalogTemplateProps {
  searchItems: SearchItem[];
}

export default function CatalogTemplate({
  content,
  pageContext: { searchItems },
}: PageProps<null, CatalogTemplateProps> & ContentProps<CatalogContent>) {
  const [selectedSort, setSelectedSort] = useState<SortValue>("dsc");
  const [filters, setFilters] = useState<Filters>(
    buildFiltersFromLocation(useLocation()),
  );

  const currentPage = usePagination();
  const pageLength = 20;

  const filteredSearchItems = useFilter(searchItems, filters, selectedSort);
  const paginatedSearchItems = filteredSearchItems.slice(
    (currentPage - 1) * pageLength,
    currentPage * pageLength,
  );

  return (
    <div
      className="fr-container--fluid"
      css={css`
        ${fr.breakpoints.down("md")} {
          background-color: ${fr.colors.decisions.background.alt.grey.default};
        }
      `}
    >
      <div className="fr-grid-row fr-grid-row--gutters">
        <SearchBarSection
          searchValue={filters.q}
          className="fr-mt-5w fr-px-3w"
          css={css`
            ${fr.breakpoints.up("md")} {
              display: none;
            }
          `}
          onSearchChange={(q: string) => {
            setFilters({ ...filters, q });
          }}
          content={content.searchBar}
        />
        <div
          css={css`
            width: 100%;
            ${fr.breakpoints.down("md")} {
              background-color: ${fr.colors.decisions.background.default.grey
                .default};
              margin: ${fr.spacing("3w")};
            }
            ${fr.breakpoints.up("md")} {
              display: flex;
            }
          `}
        >
          <FilterContainer content={content.filterContainer}>
            <CatalogFilters
              filters={filters}
              setFilters={setFilters}
              content={content.catalogFilters}
            />
          </FilterContainer>
          <div
            className="fr-mt-5w fr-px-2w"
            css={css`
              ${fr.breakpoints.up("md")} {
                width: 70%;
              }
              ${fr.breakpoints.up("lg")} {
                margin: 0 auto !important;
              }
            `}
          >
            <div>
              <SearchBarSection
                searchValue={filters.q}
                css={css`
                ${fr.breakpoints.down("md")} {
                  display: none;
              `}
                onSearchChange={(q: string) => {
                  setFilters({ ...filters, q });
                }}
                content={content.searchBar}
              />
              <div
                css={css`
                  max-width: 800px;
                `}
              >
                <div
                  css={css`
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                  `}
                >
                  <span>
                    <i>
                      {(filteredSearchItems.length > 1
                        ? content.numResultPlural
                        : content.numResult
                      ).replace("{}", filteredSearchItems.length.toString())}
                    </i>
                  </span>
                  <SortSelect
                    content={content.sortSelect}
                    value={selectedSort}
                    onChange={setSelectedSort}
                    css={css`
                      display: flex;
                      align-items: center;
                      max-width: 13em;
                    `}
                  />
                </div>
              </div>
              <div
                css={css`
                  max-width: 78rem;
                `}
              >
                <div className="fr-grid-row fr-grid-row--gutters fr-my-3w">
                  {paginatedSearchItems.map((searchItem) => (
                    <div className="fr-col-6 fr-col-xl-4">
                      <CatalogItem
                        key={`catalog-item-${searchItem.type}-${
                          searchItem.objectGroup
                            ? searchItem.objectGroup.id
                            : searchItem.project?.slug
                        }`}
                        searchItem={searchItem}
                        css={css`
                          min-height: 350px;
                        `}
                      />
                    </div>
                  ))}
                  {!paginatedSearchItems.length && (
                    <div>
                      <i>{content.noData}</i>
                    </div>
                  )}
                </div>
                {filteredSearchItems.length > pageLength && (
                  <Pagination
                    pageCount={Math.ceil(
                      filteredSearchItems.length / pageLength,
                    )}
                    currentPage={currentPage}
                    className="fr-mb-5w"
                    css={css`
                      margin: 0 auto;
                    `}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export const Head: HeadFC = BaseHead;
