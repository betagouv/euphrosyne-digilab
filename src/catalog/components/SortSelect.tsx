"use client";

import Select from "@codegouvfr/react-dsfr/SelectNext";
import { ChangeEvent, useContext } from "react";

import { SortValue } from "@/types/catalog";
import { LangContext } from "@/contexts/LangContext";
import { CatalogContext } from "../CatalogContext";

export interface SortSelectContent {
  mostRecent: string;
  mostDated: string;
  sorting: string;
  relevance: string;
}

interface SortSelectOption {
  label: string;
  value: SortValue;
}

export default function SortSelect({
  ...props
}: React.InputHTMLAttributes<HTMLDivElement>) {
  const content =
    useContext(LangContext).translations.catalogContent.sortSelect;

  const { selectedSort, setSelectedSort } = useContext(CatalogContext);

  const options: SortSelectOption[] = [
    { label: content.relevance, value: "default" },
    { label: content.mostDated, value: "asc" },
    { label: content.mostRecent, value: "desc" },
  ];

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const option = options.find((option) => option.value === e.target.value);
    if (option) {
      setSelectedSort(option.value);
    }
  };

  return (
    <Select
      label={content.sorting}
      nativeSelectProps={{
        value: selectedSort,
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
