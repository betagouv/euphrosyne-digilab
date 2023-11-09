import SearchBar from "@codegouvfr/react-dsfr/SearchBar";
import { css } from "@emotion/react";
import { useEffect, useRef } from "react";

type SearchEvent = (q: string) => void;

interface SearchBarSectionProps
  extends React.InputHTMLAttributes<HTMLDivElement> {
  searchValue: string;
  onSearchChange?: SearchEvent;
}

export default function SearchBarSection({
  searchValue,
  onSearchChange,
  ...props
}: SearchBarSectionProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (searchValue !== inputRef.current?.value) {
      inputRef.current!.value = searchValue;
    }
  }, []);
  return (
    <div {...props}>
      <h1>Parcourez le catalogue de données Euphrosyne</h1>
      <SearchBar
        big={true}
        css={css`
          max-width: 800px;
        `}
        renderInput={({ className, id, placeholder, type }) => (
          <input
            className={className}
            id={id}
            placeholder={placeholder}
            type={type}
            ref={inputRef}
            onChange={() => {
              onSearchChange && onSearchChange(inputRef.current?.value || "");
            }}
          />
        )}
      />
    </div>
  );
}
