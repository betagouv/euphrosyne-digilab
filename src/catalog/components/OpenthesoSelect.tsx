import { OpenThesoSearchItem, searchTheso } from "../../clients/opentheso";
import { Suggestion } from "../../components/AutocompleteInput";
import { AutocompleteWithDismissibleTag } from "../../components/AutocompleteWithDismissibleTag";

interface OpenthesoSelectProps {
  inputLabel: string;
  thesoId: string;
  onSuggestionClick: (suggestion: OpenThesoSearchItem) => void;
  onSelectedSuggestionRemove: () => void;
}

async function fetchSuggestions(
  thesoId: string,
  query: string,
  fetchFn: (thesoId: string, q: string) => Promise<OpenThesoSearchItem[]>,
): Promise<Suggestion<OpenThesoSearchItem>[]> {
  if (query.length === 0) return [];
  const suggestions: Suggestion<OpenThesoSearchItem>[] = [];
  (await fetchFn(thesoId, query)).forEach((result) => {
    const { label } = result;
    suggestions.push({
      label: label.length > 33 ? `...${label.slice(-33)}` : label,
      data: result,
    });
  });
  return suggestions.slice(0, 10);
}

export default function OpenthesoSelect({
  inputLabel,
  thesoId,
  onSuggestionClick,
  onSelectedSuggestionRemove,
  ...props
}: OpenthesoSelectProps) {
  return (
    <AutocompleteWithDismissibleTag
      inputLabel={inputLabel}
      fetchSuggestionsFn={(q) => fetchSuggestions(thesoId, q, searchTheso)}
      onSuggestionClick={(suggestion) => onSuggestionClick(suggestion.data)}
      onSelectedSuggestionRemove={onSelectedSuggestionRemove}
      {...props}
    />
  );
}
