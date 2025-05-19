import slugify from "slugify";

import { IItemCategory } from "@/types/ICatalog";

export function buildObjectPath({
  label,
  id,
}: {
  label: string;
  id: string;
}): string {
  return `/object/${slugify(label, { lower: true }).replaceAll(
    "'",
    "-",
  )}-${id}`;
}

export function buildCatalogItemPath({
  slug,
  category,
}: {
  slug: string;
  category: IItemCategory;
}): string {
  return `/${category}/${slug}`;
}
