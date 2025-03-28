import { SegmentedControl } from "@codegouvfr/react-dsfr/SegmentedControl";
import { useContext } from "react";

import { LangContext } from "../../contexts/LangContext";
import { CatalogViewMode } from "../../types/catalog";

interface CatalogViewModeToggleProps {
  viewMode: CatalogViewMode;
  onViewModeChange: (viewMode: CatalogViewMode) => void;
}

export interface CatalogViewModeToggleContent {
  list: string;
  grid: string;
}

export default function CatalogViewModeToggle({
  viewMode,
  onViewModeChange,
}: CatalogViewModeToggleProps) {
  const { translations } = useContext(LangContext);
  const content = translations.catalogViewModeToggleContent;

  return (
    <SegmentedControl
      legend=""
      segments={[
        {
          iconId: "fr-icon-list-unordered",
          label: content.list,
          nativeInputProps: {
            onClick: () => onViewModeChange("list"),
            checked: viewMode === "list",
          },
        },
        {
          iconId: "fr-icon-layout-grid-line",
          label: content.grid,
          nativeInputProps: {
            onClick: () => onViewModeChange("grid"),
            checked: viewMode === "grid",
          },
        },
      ]}
    />
  );
}
