import Badge from "@codegouvfr/react-dsfr/Badge";

import { SearchItem } from "../../../types/catalog";

export default function SearchItemBadge({
  searchItem,
  ...props
}: { searchItem: SearchItem } & Omit<
  React.ComponentProps<typeof Badge>,
  "children"
>) {
  return (
    <Badge
      severity={searchItem.category === "object" ? "new" : "info"}
      {...props}
    >
      {searchItem.category === "object" ? "Objet" : "Projet"}
    </Badge>
  );
}
