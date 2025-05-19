import { FiltersProps } from "@/types/catalog";

import OpenthesoSelect from "./OpenthesoSelect";
import { OpenThesoSearchItem } from "../../clients/opentheso";

interface PeriodFilterProps {
  thesoId: string;
  inputLabel: string;
  datingField: "period" | "era";
  formatLabelFn?: (label: string) => string;
}

export default function BaseDatingFilter({
  filters,
  setFilters,
  thesoId,
  inputLabel,
  datingField,
  ...props
}: PeriodFilterProps &
  FiltersProps &
  Omit<React.HTMLAttributes<HTMLDivElement>, "content">) {
  const onSuggestionClick = (suggestion: OpenThesoSearchItem | undefined) => {
    const filterFieldName =
      datingField === "period" ? "datingPeriodIds" : "datingEraIds";
    setFilters({
      ...filters,
      [filterFieldName]: suggestion ? [suggestion?.id] : undefined,
    });
  };
  return (
    <OpenthesoSelect
      inputLabel={inputLabel}
      thesoId={thesoId}
      onSuggestionClick={onSuggestionClick}
      onSelectedSuggestionRemove={() => onSuggestionClick(undefined)}
      {...props}
    />
  );
}
