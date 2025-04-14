import { OpenThesoSearchItem } from "../../clients/opentheso";
import { Filters } from "../../opensearch/useSearch";
import OpenthesoSelect from "./OpenthesoSelect";

interface PeriodFilterProps {
  filters: Filters;
  setFilters: React.Dispatch<React.SetStateAction<Filters>>;
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
}: PeriodFilterProps & Omit<React.HTMLAttributes<HTMLDivElement>, "content">) {
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
