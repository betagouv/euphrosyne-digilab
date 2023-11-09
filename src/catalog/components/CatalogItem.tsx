import Badge from "@codegouvfr/react-dsfr/Badge";
import Card from "@codegouvfr/react-dsfr/Card";
import slugify from "slugify";
import ObjectGroupMaterialTags from "../../components/object-group/ObjectGroupMaterialTags";
import { ellipse } from "../../utils";
import { css } from "@emotion/react";

type CatalogItemProps = Partial<React.ComponentProps<typeof Card>> & {
  searchItem: SearchItem;
};

function SearchItemBadge({ searchItem }: { searchItem: SearchItem }) {
  return (
    <Badge severity={searchItem.type === "ObjectGroup" ? "new" : "info"}>
      {searchItem.type === "ObjectGroup" ? "Objet" : "Projet"}
    </Badge>
  );
}

function CardStart({ searchItem }: { searchItem: SearchItem }) {
  return (
    <div>
      {searchItem.objectGroup && searchItem.objectGroup.materials.length > 0 ? (
        <ObjectGroupMaterialTags
          materials={searchItem.objectGroup.materials
            .slice(0, 3)
            .map((material) => material)}
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

export function CatalogItem({ searchItem, ...props }: CatalogItemProps) {
  let linkTo: string,
    title: string = "";
  if (searchItem.type === "ObjectGroup" && searchItem.objectGroup) {
    const { label, id } = searchItem.objectGroup;
    title = label;
    linkTo = `/object/${slugify(label)}/${id}`;
  } else if (searchItem.type === "Project" && searchItem.project) {
    const { slug, name } = searchItem.project;
    linkTo = `/project/${slug}`;
    title = name;
  } else {
    linkTo = "#";
  }

  return (
    <Card
      background
      border
      desc={ellipse(searchItem.project?.comments || "", 200)}
      enlargeLink
      linkProps={{
        href: linkTo,
      }}
      size="medium"
      start={<CardStart searchItem={searchItem} />}
      end={<SearchItemBadge searchItem={searchItem} />}
      titleAs="h3"
      title={title}
      {...props}
    />
  );
}
