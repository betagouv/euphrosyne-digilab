import { SerializedStyles } from "@emotion/react";

import { CatalogViewMode, SearchItem } from "../../../types/catalog";
import CardItem from "./CardItem";
import ListItem from "./ListItem";
import { getCurrentLangKey, localizePath } from "@/i18n";
import { getDeterministicPlaceholderImage } from "@/placeholder";

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
  const linkTo = localizePath(searchItem.pagePath, getCurrentLangKey()) || "#",
    title = searchItem.name || "";

  const item = searchItem.object || searchItem.project;

  const placeholderImageUrl = getDeterministicPlaceholderImage(searchItem.slug);

  const thumbnail =
    item?.thumbnail?.url ||
    relatedErosImageUrl ||
    placeholderImageUrl ||
    "/images/default-placeholder-16x9.png";

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
