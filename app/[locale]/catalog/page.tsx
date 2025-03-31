'use client';

import { fr } from '@codegouvfr/react-dsfr';
import { css } from '@emotion/react';
import { useContext, useEffect, useState } from 'react';

import CatalogFilters, {
  CatalogFiltersContent,
} from '../../../src/catalog/components/CatalogFilters';
import CatalogItem from '../../../src/catalog/components/CatalogItem/CatalogItem';
import CatalogViewModeToggle from '../../../src/catalog/components/CatalogViewModeToggle';
import FilterContainer, {
  FilterContainerContent,
} from '../../../src/catalog/components/FilterContainer';
import {
  Pagination,
  PaginationContent,
} from '../../../src/catalog/components/Pagination';
import SearchBarSection, {
  SearchBarContent,
} from '../../../src/catalog/components/SearchBarSection';
import SortSelect, {
  SortSelectContent,
  SortValue,
} from '../../../src/catalog/components/SortSelect';
import usePagination from '../../../src/catalog/hooks/usePagination';
import { LangContext } from '../../../src/contexts/LangContext';
import { ContentProps } from '../../../src/i18n';
import useSearch, {
  Filters,
  buildFiltersFromLocation,
} from '../../../src/opensearch/useSearch';
import { CatalogViewMode, SearchItem } from '../../../src/types/catalog';

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

// In Next.js, we'll want to fetch more of this data server-side
export default function CatalogPage({ params }: { params: { locale: string } }) {
  const { translations } = useContext(LangContext);
  const content = translations.catalogContent;

  const [selectedSort, setSelectedSort] = useState<SortValue>('default');
  const [filters, setFilters] = useState<Filters>({
    objectGroupsSelected: true,
    projectsSelected: true,
    q: '',
    from: 0,
    size: 10,
    materials: [],
  });

  const [viewMode, setViewMode] = useState<CatalogViewMode>('list');

  const currentPage = usePagination();
  const pageLength = 10;

  // In a real implementation, more of this would be pre-loaded or
  // loaded with data from server component
  const searchResult = { total: 0, results: [] };
  
  // This would be pre-populated with data from server in real implementation
  const erosImageUrls: Record<string, string | undefined> = {};

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
        ${fr.breakpoints.down('md')} {
          background-color: ${fr.colors.decisions.background.alt.grey.default};
        }
      `}
    >
      <div className="fr-grid-row fr-grid-row--gutters">
        <SearchBarSection
          searchValue={filters.q}
          className="fr-mt-5w fr-px-3w"
          css={css`
            ${fr.breakpoints.up('md')} {
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
            ${fr.breakpoints.down('md')} {
              background-color: ${fr.colors.decisions.background.default.grey
                .default};
              margin: ${fr.spacing('3w')};
            }
            ${fr.breakpoints.up('md')} {
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
              ${fr.breakpoints.up('md')} {
                width: 70%;
              }
              ${fr.breakpoints.up('lg')} {
                margin: 0 auto !important;
              }
            `}
          >
            <div>
              <SearchBarSection
                searchValue={filters.q}
                css={css`
                ${fr.breakpoints.down('md')} {
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
                      ).replace('{}', searchResult.total.toString())}
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
                  display: flex;
                  justify-content: flex-end;
                  margin-bottom: ${fr.spacing('2w')};
                `}
              >
                <CatalogViewModeToggle
                  viewMode={viewMode}
                  onViewModeChange={setViewMode}
                />
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
                      className={
                        viewMode === 'grid'
                          ? 'fr-col-6 fr-col-xl-4'
                          : 'fr-col-12'
                      }
                      key={`catalog-item-${searchItem.category}-${searchItem.slug}`}
                    >
                      <CatalogItem
                        searchItem={searchItem}
                        relatedErosImageUrl={getErosUrlForCatalogItem(
                          searchItem,
                        )}
                        viewMode={viewMode}
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

// This would be implemented in a real migration:
export async function generateStaticParams() {
  return [
    { locale: 'en' },
    { locale: 'fr' },
  ];
}