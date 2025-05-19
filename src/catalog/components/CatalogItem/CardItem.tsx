import Card from "@codegouvfr/react-dsfr/Card";

import CardStart from "./CardStart";
import SearchItemBadge from "./SearchItemBadge";
import { CatalogItemProps } from "./types";
import { ellipse } from "../../../utils";

export default function CardItem({
  searchItem,
  title,
  linkTo,
  thumbnail,
  ...props
}: CatalogItemProps) {
  return (
    <Card
      background
      border
      desc={ellipse(
        searchItem.category === "project" ? searchItem.comments : "",
        200,
      )}
      enlargeLink
      linkProps={{
        href: linkTo,
      }}
      size="medium"
      start={<CardStart searchItem={searchItem} />}
      end={<SearchItemBadge searchItem={searchItem} />}
      titleAs="h3"
      title={title}
      imageUrl={thumbnail}
      imageAlt="Image de l'objet"
      style={{ minHeight: "22rem" }}
      {...props}
    />
  );
}
