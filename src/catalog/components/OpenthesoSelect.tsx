import { OpenThesoSearchItem, searchTheso } from "../../clients/opentheso";
import { Suggestion } from "../../components/AutocompleteInput";
import { AutocompleteWithDismissibleTag } from "../../components/AutocompleteWithDismissibleTag";

interface OpenthesoSelectProps {
  inputLabel: string;
  thesoId: string;
  onSuggestionClick: (suggestion: OpenThesoSearchItem) => void;
  onSelectedSuggestionRemove: () => void;
  formatLabelFn?: (label: string) => string;
}

async function fetchSuggestions(
  thesoId: string,
  query: string,
  fetchFn: (thesoId: string, q: string) => Promise<OpenThesoSearchItem[]>,
  formatLabelFn?: (label: string) => string,
): Promise<Suggestion<OpenThesoSearchItem>[]> {
  if (query.length === 0) return [];
  const suggestions: Suggestion<OpenThesoSearchItem>[] = [],
    _formatLabelFn = formatLabelFn || ((label) => label);
  (await fetchFn(thesoId, query)).forEach((result) => {
    const { label } = result;
    suggestions.push({
      label: ellipsisLabel(_formatLabelFn(label), 33),
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
  formatLabelFn,
  ...props
}: OpenthesoSelectProps) {
  return (
    <AutocompleteWithDismissibleTag
      inputLabel={inputLabel}
      fetchSuggestionsFn={(q) =>
        fetchSuggestions(thesoId, q, searchTheso, formatLabelFn)
      }
      onSuggestionClick={(suggestion) => onSuggestionClick(suggestion.data)}
      onSelectedSuggestionRemove={onSelectedSuggestionRemove}
      {...props}
    />
  );
}

const ellipsisLabel = (label: string, newLength: number) => {
  return label.length > newLength ? `...${label.slice(-newLength)}` : label;
};
