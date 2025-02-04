import Badge from "@codegouvfr/react-dsfr/Badge";
import Card from "@codegouvfr/react-dsfr/Card";
import { SerializedStyles, css } from "@emotion/react";

import ObjectGroupMaterialTags from "../../components/object-group/ObjectGroupMaterialTags";
import { SearchItem } from "../../types/catalog";
import { ellipse } from "../../utils";

type CatalogItemProps = {
  searchItem: SearchItem;
  css?: SerializedStyles;
};

function SearchItemBadge({ searchItem }: { searchItem: SearchItem }) {
  return (
    <Badge severity={searchItem.category === "object" ? "new" : "info"}>
      {searchItem.category === "object" ? "Objet" : "Projet"}
    </Badge>
  );
}

function CardStart({ searchItem }: { searchItem: SearchItem }) {
  const { materials } = searchItem;
  return (
    <div>
      {materials && materials.length > 0 ? (
        <ObjectGroupMaterialTags
          materials={
            materials.slice(0, 3).map((material) => material) as string[]
          }
        />
      ) : (
        <div
          css={css`
            height: 2.5em;
          `}
        ></div>
      )}
    </div>
  );
}

export function CatalogItem({ searchItem, css }: CatalogItemProps) {
  const linkTo = searchItem.pagePath || "#",
    title = searchItem.name || "";

  const thumbnail =
    searchItem.object?.thumbnail?.url ||
    searchItem.project?.thumbnail?.url ||
    "https://www.systeme-de-design.gouv.fr/img/placeholder.16x9.png";

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
      css={{ ...css, minHeight: "22rem" }}
    />
  );
}
