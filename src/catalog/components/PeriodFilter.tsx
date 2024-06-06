import { OpenThesoSearchItem } from "../../clients/opentheso";
import { ContentProps } from "../../i18n";
import { Filters } from "../../opensearch/useSearch";
import OpenthesoSelect from "./OpenthesoSelect";

const THESO_ID = "th289";

export interface PeriodFilterContent {
  period: string;
}

interface PeriodFilterProps {
  filters: Filters;
  setFilters: React.Dispatch<React.SetStateAction<Filters>>;
}

export default function PeriodFilter({
  content,
  filters,
  setFilters,
  ...props
}: PeriodFilterProps &
  Omit<React.HTMLAttributes<HTMLDivElement>, "content"> &
  ContentProps<PeriodFilterContent>) {
  const onSuggestionClick = (suggestion: OpenThesoSearchItem | undefined) => {
    setFilters({
      ...filters,
      periodIds: suggestion ? [suggestion?.id] : undefined,
    });
  };
  return (
    <OpenthesoSelect
      inputLabel={content.period}
      thesoId={THESO_ID}
      onSuggestionClick={onSuggestionClick}
      onSelectedSuggestionRemove={() => onSuggestionClick(undefined)}
      {...props}
    />
  );
}
