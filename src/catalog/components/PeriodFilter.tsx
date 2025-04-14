import { ContentProps } from "../../i18n";
import { Filters } from "../../opensearch/useSearch";
import { formatDatingLabel } from "../../utils";
import BaseDatingFilter from "./BaseDatingFilter";

const THESO_ID = "th287";

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
  return (
    <BaseDatingFilter
      filters={filters}
      inputLabel={content.period}
      thesoId={THESO_ID}
      setFilters={setFilters}
      datingField="period"
      formatLabelFn={formatDatingLabel}
      {...props}
    />
  );
}
