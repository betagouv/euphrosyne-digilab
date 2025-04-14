import { I18nLink as Link } from "../../../components/I18nLink";
import { ellipse } from "../../../utils";
import CardStart from "./CardStart";
import SearchItemBadge from "./SearchItemBadge";
import { CatalogItemProps } from "./types";
import Image from "next/image";
import { tss } from "tss-react";
import { fr } from "@codegouvfr/react-dsfr";

export default function ListItem({
  searchItem,
  title,
  linkTo,
  thumbnail,
}: CatalogItemProps) {
  const { classes, cx } = tss.create({
    root: {
      border: "1px solid var(--border-default-grey)",
    },
    thumbnailContainer: {
      display: "flex",
      position: "relative",
      background: "white",
      border: "1px solid var(--grey-950-100)",
      padding: "0.75rem",
      [fr.breakpoints.up("md")]: {
        maxWidth: "140px",
      },
    },
    image: {
      objectFit: "cover",
    },
    titleContainer: {
      overflow: "hidden",
    },
  })();
  return (
    <div
      className={cx(
        classes.root,
        fr.cx("fr-my-1v", "fr-p-1w", "fr-enlarge-link")
      )}
    >
      <div className="fr-grid-row fr-grid-row--gutters fr-grid-row--top">
        <div className="fr-col-auto">
          <div className={cx(classes.thumbnailContainer)}>
            <Image
              loading="lazy"
              alt={`Image de ${searchItem.name}`}
              width="60"
              height="60"
              src={thumbnail}
              className={cx(classes.image)}
            />
          </div>
        </div>
        <div className="fr-col-10">
          <SearchItemBadge searchItem={searchItem} small />

          <h3 className="fr-text--md fr-mb-0 fr-grid-row">
            <Link className="fr-grid-row" href={linkTo}>
              <div className={cx(classes.titleContainer, fr.cx("fr-col"))}>
                <span>{title}</span>
              </div>
            </Link>
          </h3>
          <div className="fr-text--sm fr-my-1w">
            <span>{ellipse(searchItem.project?.comments || "", 500)}</span>
          </div>
          <CardStart searchItem={searchItem} />
        </div>
      </div>
    </div>
  );
}
