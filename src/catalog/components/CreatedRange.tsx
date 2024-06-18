import { Range } from "@codegouvfr/react-dsfr/Range";
import { useEffect, useState } from "react";

import { fetchCreatedAggs } from "../../clients/search";
import { ContentProps } from "../../i18n";
import { Filters } from "../../opensearch/useSearch";

export interface CreatedRangeContent {
  label: string;
}

interface CreatedRangeProps {
  filters: Filters;
  setFilters: React.Dispatch<React.SetStateAction<Filters>>;
}

export default function CreatedRange({
  content,
  filters,
  setFilters,
}: CreatedRangeProps & ContentProps<CreatedRangeContent>) {
  const minYear = 1970;
  const maxYear = new Date().getFullYear();
  const [ranges, setRanges] = useState<number[]>([minYear, maxYear]);

  useEffect(() => {
    fetchCreatedAggs().then((response) => {
      const results = response.map((dateResult) =>
        new Date(dateResult.key).getFullYear(),
      );
      setRanges(results);
    });
  }, []);

  const min = Math.min(...ranges),
    max = Math.max(...ranges);

  const values = [
    filters.createdFromYear || minYear,
    filters.createdToYear || maxYear,
  ];

  return (
    <Range
      double
      label={content.label}
      max={max}
      min={min}
      nativeInputProps={[
        {
          value: values[0],
          onChange: (e) => {
            setFilters({
              ...filters,
              createdFromYear: parseInt(e.target.value),
            });
          },
        },
        {
          value: values[1],
          onChange: (e) => {
            setFilters({
              ...filters,
              createdToYear: parseInt(e.target.value),
            });
          },
        },
      ]}
    />
  );
}
