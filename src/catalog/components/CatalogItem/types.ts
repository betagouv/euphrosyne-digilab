import { SearchItem } from "../../../types/catalog";

export interface CatalogItemProps {
  searchItem: SearchItem;
  title: string;
  linkTo: string;
  thumbnail: string;
}
