"use client";

import Button from "@codegouvfr/react-dsfr/Button";
import Input from "@codegouvfr/react-dsfr/Input";
import { useCallback, useEffect, useRef, useState } from "react";

import { useDebounce } from "../hooks/useDebounce";
import { useStyles } from "tss-react";

export interface Suggestion<T> {
  label: string;
  data: T;
}

interface AutocompleteInputProps<T> {
  label?: string;
  fetchSuggestionsFn: (query: string) => Promise<Suggestion<T>[]>;
  onSuggestionClick: (suggestion: Suggestion<T>) => void;
}

export default function AutocompleteInput<T>({
  label,
  fetchSuggestionsFn,
  onSuggestionClick,
}: AutocompleteInputProps<T>) {
  const { css } = useStyles();

  const suggestionsContainerStyle = css({
    position: "absolute",
    top: "73px",
    backgroundColor: "var(--background-default-grey)",
    width: "100%",
    boxShadow: "rgba(0, 0, 0, 0.1) 0px 1px 3px 0px",
    zIndex: 2,
  });

  const thisRef = useRef<HTMLDivElement>(null);

  const [inputValue, setInputValue] = useState<string>("");
  const [suggestions, setSuggestions] = useState<Suggestion<T>[]>([]);
  const [suggestionsVisible, setSuggestionsVisible] = useState<boolean>(false);

  const debouncedFetch = useDebounce(
    () =>
      fetchSuggestionsFn(inputValue).then((s) => {
        setSuggestionsVisible(true);
        setSuggestions(s);
      }),
    300
  );

  useEffect(() => {
    debouncedFetch();
  }, [inputValue]);

  const handleClickOutside = useCallback(
    (event: MouseEvent) => {
      const isInside = thisRef.current?.contains(event.target as Node);
      if (!isInside && suggestionsVisible) {
        setSuggestionsVisible(false);
      }
    },
    [suggestionsVisible]
  );

  useEffect(() => {
    document.addEventListener("click", (event) => {
      handleClickOutside(event);
    });
  });

  return (
    <div className={css({ position: "relative" })} ref={thisRef}>
      <Input
        label={label}
        iconId="fr-icon-search-line"
        nativeInputProps={{
          onChange: (e) => setInputValue(e.target.value),
          value: inputValue,
        }}
      />
      {suggestions.length !== 0 && suggestionsVisible && (
        <div className={`fr-p-1v ${suggestionsContainerStyle}`}>
          {suggestions.map((suggestion) => (
            <div key={`suggestion-${suggestion.label}`}>
              <Button
                priority="tertiary no outline"
                onClick={() => {
                  setSuggestionsVisible(false);
                  onSuggestionClick(suggestion);
                }}
                className={css({ width: "100% !important" })}
              >
                {suggestion.label}
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
