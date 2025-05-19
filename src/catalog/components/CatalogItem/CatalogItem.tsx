import { SerializedStyles } from "@emotion/react";

import { Lang, defaultLangKey, localizePath } from "@/i18n";
import { getDeterministicPlaceholderImage } from "@/placeholder";

import CardItem from "./CardItem";
import ListItem from "./ListItem";
import { CatalogViewMode, SearchItem } from "../../../types/catalog";

type CatalogItemProps = {
  searchItem: SearchItem;
  relatedErosImageUrl?: string | null;
  css?: SerializedStyles;
  viewMode?: CatalogViewMode;
  lang?: Lang;
};

export default function CatalogItem({
  searchItem,
  relatedErosImageUrl,
  viewMode = "list",
  lang,
  ...props
}: CatalogItemProps) {
  const linkTo =
      localizePath(searchItem.pagePath, lang || defaultLangKey) || "#",
    title = searchItem.name || "";

  const item = searchItem;

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
