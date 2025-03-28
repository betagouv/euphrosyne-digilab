import Card from "@codegouvfr/react-dsfr/Card";
import { SerializedStyles } from "@emotion/react";

import { ellipse } from "../../../utils";
import CardStart from "./CardStart";
import SearchItemBadge from "./SearchItemBadge";
import { CatalogItemProps } from "./types";

export default function CardItem({
  searchItem,
  title,
  linkTo,
  thumbnail,
  ...props
}: CatalogItemProps & { css?: SerializedStyles }) {
  return (
    <Card
      background
      border
      desc={ellipse(searchItem.project?.comments || "", 200)}
      enlargeLink
      linkProps={{
        to: linkTo,
      }}
      size="medium"
      start={<CardStart searchItem={searchItem} />}
      end={<SearchItemBadge searchItem={searchItem} />}
      titleAs="h3"
      title={title}
      imageUrl={thumbnail}
      imageAlt="Image de l'objet"
      css={{ ...props.css, minHeight: "22rem" }}
    />
  );
}
