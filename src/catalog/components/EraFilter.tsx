import { ContentProps } from "../../i18n";
import { Filters } from "../../opensearch/useSearch";
import BaseDatingFilter from "./BaseDatingFilter";

const THESO_ID = "th289";

export interface EraFilterContent {
  era: string;
}

interface EraFilterProps {
  filters: Filters;
  setFilters: React.Dispatch<React.SetStateAction<Filters>>;
}

export default function EraFilter({
  content,
  filters,
  setFilters,
  ...props
}: EraFilterProps &
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
