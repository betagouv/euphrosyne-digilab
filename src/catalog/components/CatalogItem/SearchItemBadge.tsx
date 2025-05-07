"use client";

import Badge from "@codegouvfr/react-dsfr/Badge";
import { useContext } from "react";

import { LangContext } from "@/contexts/LangContext";

import { SearchItem } from "../../../types/catalog";

export default function SearchItemBadge({
  searchItem,
  ...props
}: { searchItem: SearchItem } & Omit<
  React.ComponentProps<typeof Badge>,
  "children"
>) {
  const { translations } = useContext(LangContext);

  return (
    <Badge
      severity={searchItem.category === "object" ? "new" : "info"}
      {...props}
    >
      {searchItem.category === "object"
        ? translations.base.object
        : translations.base.project}
    </Badge>
  );
}
