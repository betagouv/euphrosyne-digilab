import { SerializedStyles } from "@emotion/react";

import { CatalogViewMode, SearchItem } from "../../../types/catalog";
import CardItem from "./CardItem";
import ListItem from "./ListItem";

type CatalogItemProps = {
  searchItem: SearchItem;
  relatedErosImageUrl?: string | null;
  css?: SerializedStyles;
  viewMode?: CatalogViewMode;
};

export default function CatalogItem({
  searchItem,
  relatedErosImageUrl,
  viewMode = "list",
  ...props
}: CatalogItemProps) {
  const linkTo = searchItem.pagePath || "#",
    title = searchItem.name || "";

  const thumbnail =
    searchItem.object?.thumbnail?.url ||
    relatedErosImageUrl ||
    searchItem.project?.thumbnail?.url ||
    "https://www.systeme-de-design.gouv.fr/img/placeholder.16x9.png";

  return viewMode === "grid" ? (
    <CardItem
      searchItem={searchItem}
      title={title}
      linkTo={linkTo}
      thumbnail={thumbnail}
      {...props}
    />
  ) : (
    <ListItem
      title={title}
      thumbnail={thumbnail}
      linkTo={linkTo}
      searchItem={searchItem}
    />
  );
}
