import { Checkbox } from "@codegouvfr/react-dsfr/Checkbox";

import { ContentProps } from "../../i18n";

export interface CatalogFiltersContent {
  project: string;
  objectGroup: string;
  itemType: string;
}

export interface Filters {
  [key: string]: string | boolean | undefined;
  objectGroupsSelected: boolean;
  projectsSelected: boolean;
  q: string;
}

interface FiltersProps {
  filters: Filters;
  setFilters: React.Dispatch<React.SetStateAction<Filters>>;
}

export default function CatalogFilters({
  filters,
  setFilters,
  content,
}: FiltersProps & ContentProps<CatalogFiltersContent>) {
  const itemTypeOptions: [
    string,
    "objectGroupsSelected" | "projectsSelected",
  ][] = [
    [content.project, "projectsSelected"],
    [content.objectGroup, "objectGroupsSelected"],
  ];
  return (
    <div>
      <Checkbox
        legend={content.itemType}
        options={itemTypeOptions.map(([label, propertyName]) => ({
          label,
          nativeInputProps: {
            name: "object-types",
            value: label,
            onChange: (e) => {
              setFilters({
                ...filters,
                [propertyName]: e.target.checked,
              });
            },
            checked: filters[propertyName],
          },
        }))}
        orientation="horizontal"
      />
    </div>
  );
}
