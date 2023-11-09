import { Checkbox } from "@codegouvfr/react-dsfr/Checkbox";

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

export default function CatalogFilters({ filters, setFilters }: FiltersProps) {
  const itemTypeOptions: [
    string,
    "objectGroupsSelected" | "projectsSelected"
  ][] = [
    ["Projet", "projectsSelected"],
    ["Groupe d'objets", "objectGroupsSelected"],
  ];
  return (
    <div>
      <Checkbox
        legend="Type d'item"
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
