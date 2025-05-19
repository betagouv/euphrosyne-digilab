import CatalogFilters, {
  CatalogFiltersContent,
} from "@/catalog/components/CatalogFilters";
import CatalogViewModeToggle from "@/catalog/components/CatalogViewModeToggle";
import FilterContainer, {
  FilterContainerContent,
} from "@/catalog/components/FilterContainer";
import { PaginationContent } from "@/catalog/components/Pagination";
import SearchBarSection, {
  SearchBarContent,
} from "@/catalog/components/SearchBarSection";
import SearchResults from "@/catalog/components/SearchResults";
import SearchResultsCount from "@/catalog/components/SearchResultsCount";
import SortSelect, { SortSelectContent } from "@/catalog/components/SortSelect";
import { CatalogProviders } from "@/catalog/providers";
import { StartDsfrOnHydration } from "@/dsfr-bootstrap";

import { getTranslations } from "../dictionaries";
import { IPageParam } from "../types";
import styles from "./page.module.css";

export { generateStaticParams } from "../static-params";

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

interface IIDImageMapping {
  [key: string]: string | undefined;
}

export default async function CatalogPage({
  params,
}: {
  params: Promise<IPageParam>;
}) {
  const { lang } = await params;

  const translations = getTranslations(lang);

  const content = translations.catalogContent;

  const erosImageUrls: IIDImageMapping = {};
  /*
  for (const node of data.c2rmfImages?.nodes || []) {
    erosImageUrls[node.c2rmfId as string] = node.fields?.erosImage?.image
      ?.publicURL as string | undefined;
  }
      */

  return (
    <div className={`fr-container--fluid ${styles.root}`}>
      <StartDsfrOnHydration />
      <div className="fr-grid-row fr-grid-row--gutters">
        <CatalogProviders>
          <SearchBarSection
            className={`fr-mt-5w fr-px-3w ${styles.searchBarSm}`}
            content={content.searchBar}
          />
          <div className={styles.catalogContainer}>
            <FilterContainer content={content.filterContainer}>
              <CatalogFilters content={content.catalogFilters} />
            </FilterContainer>

            <div
              className={`fr-mt-5w fr-px-2w ${styles.searchResultsContainer}`}
            >
              <div>
                <SearchBarSection
                  content={content.searchBar}
                  className="fr-mt-3w"
                />
                <div
                  style={{
                    maxWidth: "800px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <SearchResultsCount />
                    <SortSelect
                      style={{
                        display: "flex",
                        alignItems: "center",
                        maxWidth: "13em",
                      }}
                    />
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                  }}
                  className="fr-mb-2w"
                >
                  <CatalogViewModeToggle />
                </div>
                <div
                  style={{
                    maxWidth: "78rem",
                    minHeight: "1500px",
                  }}
                >
                  <SearchResults erosImageUrls={erosImageUrls} lang={lang} />
                </div>
              </div>
            </div>
          </div>
        </CatalogProviders>
      </div>
    </div>
  );
}
