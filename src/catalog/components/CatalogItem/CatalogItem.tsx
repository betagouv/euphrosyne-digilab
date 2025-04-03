import { SerializedStyles } from "@emotion/react";

import { CatalogViewMode, SearchItem } from "../../../types/catalog";
import CardItem from "./CardItem";
import ListItem from "./ListItem";

type CatalogItemProps = {
  searchItem: SearchItem;
  relatedErosImageUrl?: string | null;
  placeholderImageUrl?: string | null;
  css?: SerializedStyles;
  viewMode?: CatalogViewMode;
};

export default function CatalogItem({
  searchItem,
  relatedErosImageUrl,
  placeholderImageUrl,
  viewMode = "list",
  ...props
}: CatalogItemProps) {
  const linkTo = searchItem.pagePath || "#",
    title = searchItem.name || "";

  const item = searchItem.object || searchItem.project;

  const thumbnail =
    item?.thumbnail?.url ||
    relatedErosImageUrl ||
    placeholderImageUrl ||
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
