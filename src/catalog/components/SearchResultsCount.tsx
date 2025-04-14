"use client";

import { LangContext } from "@/contexts/LangContext";
import { useContext } from "react";
import { CatalogContext } from "../CatalogContext";

export default function SearchResultsCount() {
  const { translations } = useContext(LangContext);
  const content = translations.catalogContent;

  const { searchResult } = useContext(CatalogContext);

  return (
    <span>
      <i>
        {(searchResult.total > 1
          ? content.numResultPlural
          : content.numResult
        ).replace("{}", searchResult.total.toString())}
      </i>
    </span>
  );
}
