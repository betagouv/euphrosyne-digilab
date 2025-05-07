import { Range } from "@codegouvfr/react-dsfr/Range";
import { useEffect, useState } from "react";

import { FiltersProps } from "@/types/catalog";

import { fetchCreatedAggs } from "../../clients/search";
import { ContentProps } from "../../i18n";

export interface CreatedRangeContent {
  label: string;
}

export default function CreatedRange({
  content,
  filters,
  setFilters,
}: FiltersProps & ContentProps<CreatedRangeContent>) {
  const minYear = 1970;
  const maxYear = new Date().getFullYear();
  const [ranges, setRanges] = useState<number[]>([minYear, maxYear]);

  useEffect(() => {
    fetchCreatedAggs().then((response) => {
      const results = response.map((dateResult) =>
        new Date(dateResult.key).getFullYear()
      );
      setRanges(results);
    });
  }, []);

  const min = ranges.length ? Math.min(...ranges) : minYear,
    max = ranges.length ? Math.max(...ranges) : maxYear;

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
