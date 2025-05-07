"use client";

import SearchBar from "@codegouvfr/react-dsfr/SearchBar";
import { useContext, useEffect, useRef } from "react";

import { ContentProps } from "../../i18n";
import { CatalogContext } from "../CatalogContext";

export interface SearchBarContent {
  title: string;
}

export default function SearchBarSection({
  content,
  ...props
}: Omit<React.InputHTMLAttributes<HTMLDivElement>, "content"> &
  ContentProps<SearchBarContent>) {
  const { filters, setFilters } = useContext(CatalogContext);

  const inputRef = useRef<HTMLInputElement>(null);

  const searchValue = filters.q;

  const onSearchChange = (q: string) => {
    setFilters({ ...filters, q });
  };

  useEffect(() => {
    if (searchValue !== inputRef.current?.value) {
      inputRef.current!.value = searchValue;
    }
  }, [searchValue]);

  return (
    <div {...props} className={`${props.className}`}>
      <h1>{content.title}</h1>
      <SearchBar
        big={true}
        style={{
          maxWidth: "800px",
        }}
        renderInput={({ className, id, placeholder, type }) => (
          <input
            className={className}
            id={id}
            placeholder={placeholder}
            type={type}
            ref={inputRef}
            onChange={() => {
              if (onSearchChange) onSearchChange(inputRef.current?.value || "");
            }}
          />
        )}
      />
    </div>
  );
}
