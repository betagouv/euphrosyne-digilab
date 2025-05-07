import { FiltersProps } from "@/types/catalog";

import { ContentProps } from "../../i18n";

import BaseDatingFilter from "./BaseDatingFilter";

const THESO_ID = "th289";

export interface EraFilterContent {
  era: string;
}

export default function EraFilter({
  content,
  filters,
  setFilters,
  ...props
}: FiltersProps &
  Omit<React.HTMLAttributes<HTMLDivElement>, "content"> &
  ContentProps<EraFilterContent>) {
  return (
    <BaseDatingFilter
      filters={filters}
      inputLabel={content.era}
      thesoId={THESO_ID}
      setFilters={setFilters}
      datingField="era"
      {...props}
    />
  );
}
