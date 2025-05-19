import { FiltersProps } from "@/types/catalog";

import BaseDatingFilter from "./BaseDatingFilter";
import { ContentProps } from "../../i18n";
import { formatDatingLabel } from "../../utils";

const THESO_ID = "th287";

export interface PeriodFilterContent {
  period: string;
}

export default function PeriodFilter({
  content,
  filters,
  setFilters,
  ...props
}: FiltersProps &
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
