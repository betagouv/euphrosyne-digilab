import { FiltersProps } from "@/types/catalog";

import { searchGeonames } from "../../clients/geonames";
import { Suggestion } from "../../components/AutocompleteInput";
import { AutocompleteWithDismissibleTag } from "../../components/AutocompleteWithDismissibleTag";
import { ContentProps } from "../../i18n";
import { BoundingBox } from "../../opensearch/useSearch";

export interface DiscoveryPlaceFilterContent {
  discoveryPlace: string;
}

const fetchLocationSuggestions = async (
  query: string,
): Promise<Suggestion<BoundingBox>[]> => {
  if (query.length === 0) return [];
  const suggestions: Suggestion<BoundingBox>[] = [];
  (await searchGeonames(query)).forEach((result) => {
    if (result.bbox) {
      const { name, bbox } = result;
      suggestions.push({
        label: name,
        data: {
          topLeft: {
            lat: bbox.north,
            lon: bbox.west,
          },
          bottomRight: {
            lat: bbox.south,
            lon: bbox.east,
          },
        } as BoundingBox,
      });
    }
  });
  return suggestions;
};

export function DiscoveryPlaceFilter({
  setFilters,
  filters,
  content,
  ...props
}: FiltersProps &
  Omit<React.HTMLAttributes<HTMLDivElement>, "content"> &
  ContentProps<DiscoveryPlaceFilterContent>) {
  const onLocationSuggestionClick = (suggestion: Suggestion<BoundingBox>) => {
    setFilters({ ...filters, bBox: suggestion.data });
  };

  const removeDiscoveryPlace = () => {
    setFilters({ ...filters, bBox: undefined });
  };

  return (
    <AutocompleteWithDismissibleTag
      inputLabel={content.discoveryPlace}
      fetchSuggestionsFn={fetchLocationSuggestions}
      onSuggestionClick={onLocationSuggestionClick}
      onSelectedSuggestionRemove={removeDiscoveryPlace}
      {...props}
    />
  );
}
