"use client";

import { useContext } from "react";
import { CatalogContext } from "../CatalogContext";
import { LangContext } from "@/contexts/LangContext";
import CatalogItem from "./CatalogItem/CatalogItem";
import { Pagination } from "./Pagination";
import { IIDImageMapping, SearchItem } from "@/types/catalog";

const PAGE_LENGTH = 10;

const getErosUrlForCatalogItem = (
  erosImageUrls: IIDImageMapping,
  item: SearchItem
) => {
  if (
    item.object &&
    item.object.c2rmfId &&
    item.object.c2rmfId in erosImageUrls
  ) {
    return erosImageUrls[item.object.c2rmfId];
  }
  return null;
};

export default function SearchResults({
  erosImageUrls,
}: {
  erosImageUrls: IIDImageMapping;
}) {
  const { translations } = useContext(LangContext);
  const content = translations.catalogContent;

  const { searchResult, currentPage, viewMode } = useContext(CatalogContext);

  return (
    <div>
      <div className="fr-grid-row fr-grid-row--gutters fr-my-3w">
        {searchResult.results.map((searchItem) => (
          <div
            className={
              viewMode === "grid" ? "fr-col-6 fr-col-xl-4" : "fr-col-12"
            }
            key={`catalog-item-${searchItem.category}-${searchItem.slug}`}
          >
            <CatalogItem
              searchItem={searchItem}
              relatedErosImageUrl={getErosUrlForCatalogItem(
                erosImageUrls,
                searchItem
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
      {searchResult.total > PAGE_LENGTH && (
        <Pagination
          pageCount={Math.ceil(searchResult.total / PAGE_LENGTH)}
          currentPage={currentPage}
          className="fr-mb-5w"
          style={{
            margin: "0 auto",
          }}
          content={content.pagination}
        />
      )}
    </div>
  );
}
