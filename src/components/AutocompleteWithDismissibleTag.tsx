import Tag from "@codegouvfr/react-dsfr/Tag";
import { useState } from "react";

import AutocompleteInput, { Suggestion } from "./AutocompleteInput";

interface AutocompleteWithDismissibleTagProps<T> {
  fetchSuggestionsFn: (query: string) => Promise<Suggestion<T>[]>;
  onSuggestionClick: (suggestion: Suggestion<T>) => void;
  onSelectedSuggestionRemove: () => void;
  inputLabel: string;
}

export function AutocompleteWithDismissibleTag<T>({
  inputLabel,
  onSuggestionClick,
  onSelectedSuggestionRemove,
  fetchSuggestionsFn,
  ...props
}: AutocompleteWithDismissibleTagProps<T> &
  Omit<React.HTMLAttributes<HTMLDivElement>, "content">) {
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);

  const onTagClick = (suggestion: Suggestion<T>) => {
    setSelectedLocation(suggestion.label);
    onSuggestionClick(suggestion);
  };

  const removeSelectedSuggestion = () => {
    setSelectedLocation(null);
    onSelectedSuggestionRemove();
  };

  return (
    <div {...props}>
      <AutocompleteInput
        label={inputLabel}
        fetchSuggestionsFn={fetchSuggestionsFn}
        onSuggestionClick={onTagClick}
      />
      {selectedLocation && (
        <Tag
          dismissible
          nativeButtonProps={{ onClick: () => removeSelectedSuggestion() }}
          className="fr-mt-1w"
        >
          {selectedLocation}
        </Tag>
      )}
    </div>
  );
}
