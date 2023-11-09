import Select from "@codegouvfr/react-dsfr/SelectNext";
import { ChangeEvent } from "react";

export type SortValue = "asc" | "dsc";

interface SortSelectOption {
  label: string;
  value: SortValue;
}
interface SortSelectProps
  extends Omit<React.InputHTMLAttributes<HTMLDivElement>, "onChange"> {
  onChange: (value: SortValue) => void;
  value: SortValue;
}

export default function SortSelect({
  onChange,
  value,
  ...props
}: SortSelectProps) {
  const options: SortSelectOption[] = [
    { label: "Plus anciens", value: "asc" },
    { label: "Plus récents", value: "dsc" },
  ];

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const option = options.find((option) => option.value === e.target.value);
    if (option) {
      onChange(option.value);
    }
  };

  return (
    <Select
      label="Tri: "
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
