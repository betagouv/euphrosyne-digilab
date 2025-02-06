import { fr } from "@codegouvfr/react-dsfr";
import { css } from "@emotion/react";
import { HeadFC, PageProps, graphql } from "gatsby";
import { useContext, useEffect, useState } from "react";

import CatalogFilters, {
  CatalogFiltersContent,
} from "../catalog/components/CatalogFilters";
import { CatalogItem } from "../catalog/components/CatalogItem";
import FilterContainer, {
  FilterContainerContent,
} from "../catalog/components/FilterContainer";
import {
  Pagination,
  PaginationContent,
} from "../catalog/components/Pagination";
import SearchBarSection, {
  SearchBarContent,
} from "../catalog/components/SearchBarSection";
import SortSelect, {
  SortSelectContent,
  SortValue,
} from "../catalog/components/SortSelect";
import usePagination from "../catalog/hooks/usePagination";
import { BaseHead } from "../components/BaseHead";
import { LangContext } from "../contexts/LangContext";
import { ContentProps } from "../i18n";
import useSearch, {
  Filters,
  buildFiltersFromLocation,
} from "../opensearch/useSearch";
import { SearchItem } from "../types/catalog";

export interface CatalogContent {
  noData: string;
  numResult: string;
  numResultPlural: string;

  searchBar: SearchBarContent;
  filterContainer: FilterContainerContent;
  catalogFilters: CatalogFiltersContent;
  sortSelect: SortSelectContent;
  pagination: PaginationContent;
}

export interface CatalogTemplateProps extends PageProps {
  searchItems: SearchItem[];
}

interface C2rmfImages {
  [key: string]: string | undefined;
}

export default function CatalogPage({
  location,
  data,
}: PageProps<Queries.CatalogPageQuery> & ContentProps<CatalogContent>) {
  //const searchItems = allCatalogItem.nodes as SearchItem[];
  const { translations } = useContext(LangContext);
  const content = translations.catalogContent;

  const [selectedSort, setSelectedSort] = useState<SortValue>("default");
  const [filters, setFilters] = useState<Filters>(
    buildFiltersFromLocation(location),
  );

  const currentPage = usePagination();
  const pageLength = 10;

  const searchResult = useSearch(filters, selectedSort, location);

  const erosImageUrls: C2rmfImages = {};
  for (const node of data.c2rmfImages?.nodes || []) {
    erosImageUrls[node.c2rmfId as string] = node.fields?.erosImage?.image
      ?.publicURL as string | undefined;
  }

  const getErosUrlForCatalogItem = (item: SearchItem) => {
    if (
      item.object &&
      item.object.c2rmfId &&
      item.object.c2rmfId in erosImageUrls
    ) {
      return erosImageUrls[item.object.c2rmfId];
    }
    return null;
  };

  useEffect(() => {
    const from = filters.size * (currentPage - 1);
    if (from !== filters.from) {
      setFilters({ ...filters, from });
    }
  }, [currentPage]);

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
                      {(searchResult.total > 1
                        ? content.numResultPlural
                        : content.numResult
                      ).replace("{}", searchResult.total.toString())}
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
                  min-height: 1500px;
                `}
              >
                <div className="fr-grid-row fr-grid-row--gutters fr-my-3w">
                  {searchResult.results.map((searchItem) => (
                    <div
                      className="fr-col-6 fr-col-xl-4"
                      key={`catalog-item-${searchItem.category}-${searchItem.slug}`}
                    >
                      <CatalogItem
                        searchItem={searchItem}
                        relatedErosImageUrl={getErosUrlForCatalogItem(
                          searchItem,
                        )}
                      />
                    </div>
                  ))}
                  {!searchResult.results.length && (
                    <div>
                      <i>{content.noData}</i>
                    </div>
                  )}
                </div>
                {searchResult.total > pageLength && (
                  <Pagination
                    pageCount={Math.ceil(searchResult.total / pageLength)}
                    currentPage={currentPage}
                    className="fr-mb-5w"
                    css={css`
                      margin: 0 auto;
                    `}
                    content={content.pagination}
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

export const query = graphql`
  query CatalogPage {
    allCatalogItem {
      nodes {
        name
        pagePath
        materials
        category
        slug
        created
        object {
          id
          c2rmfId
          thumbnail {
            url
          }
        }
        project {
          comments
          thumbnail {
            url
          }
        }
      }
    }
    c2rmfImages: allObjectGroup(filter: { c2rmfId: { ne: null } }) {
      nodes {
        fields {
          erosImage {
            image {
              publicURL
            }
          }
        }
        c2rmfId
      }
    }
  }
`;
