"use client";

import { SegmentedControl } from "@codegouvfr/react-dsfr/SegmentedControl";
import { useContext } from "react";

import { LangContext } from "../../contexts/LangContext";
import { CatalogContext } from "../CatalogContext";

export interface CatalogViewModeToggleContent {
  list: string;
  grid: string;
}

export default function CatalogViewModeToggle() {
  const { translations } = useContext(LangContext);
  const content = translations.catalogViewModeToggleContent;

  const { viewMode, setViewMode } = useContext(CatalogContext);

  return (
    <SegmentedControl
      legend=""
      segments={[
        {
          iconId: "fr-icon-list-unordered",
          label: content.list,
          nativeInputProps: {
            onClick: () => setViewMode("list"),
            checked: viewMode === "list",
            onChange: () => {},
          },
        },
        {
          iconId: "fr-icon-layout-grid-line",
          label: content.grid,
          nativeInputProps: {
            onClick: () => setViewMode("grid"),
            checked: viewMode === "grid",
            onChange: () => {},
          },
        },
      ]}
    />
  );
}
