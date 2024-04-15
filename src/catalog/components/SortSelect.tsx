import Select from "@codegouvfr/react-dsfr/SelectNext";
import { ChangeEvent } from "react";

import { ContentProps } from "../../i18n";

export type SortValue = "asc" | "dsc";

export interface SortSelectContent {
  mostRecent: string;
  mostDated: string;
  sorting: string;
}

interface SortSelectOption {
  label: string;
  value: SortValue;
}
interface SortSelectProps
  extends Omit<
    Omit<React.InputHTMLAttributes<HTMLDivElement>, "onChange">,
    "content"
  > {
  onChange: (value: SortValue) => void;
  value: SortValue;
}

export default function SortSelect({
  onChange,
  value,
  content,
  ...props
}: SortSelectProps & ContentProps<SortSelectContent>) {
  const options: SortSelectOption[] = [
    { label: content.mostDated, value: "asc" },
    { label: content.mostRecent, value: "dsc" },
  ];

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const option = options.find((option) => option.value === e.target.value);
    if (option) {
      onChange(option.value);
    }
  };

  return (
    <Select
      label={content.sorting}
      nativeSelectProps={{
        value,
        onChange: handleChange,
        style: {
          backgroundColor: "transparent",
          boxShadow: "none",
          marginTop: 0,
        },
      }}
      options={options}
      {...props}
    />
  );
}
