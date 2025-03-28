import { css } from "@emotion/react";
import { Link } from "gatsby";

import { ellipse } from "../../../utils";
import CardStart from "./CardStart";
import SearchItemBadge from "./SearchItemBadge";
import { CatalogItemProps } from "./types";

const thumbnailContainerStyles = css`
  display: flex;
  position: relative;
  background: white;
  border: 1px solid var(--grey-950-100);
  padding: 0.75rem;
  @media (max-width: 48em) {
    max-width: 140px;
  }
`;

const titleContainerStyle = css`
  overflow: hidden;
`;

const greyBorderStyle = css`
  border: 1px solid var(--border-default-grey);
`;

const thumbnailImageStyles = css`
  object-fit: cover;
`;

export default function ListItem({
  searchItem,
  title,
  linkTo,
  thumbnail,
}: CatalogItemProps) {
  return (
    <div className="fr-my-1v fr-p-1w fr-enlarge-link" css={greyBorderStyle}>
      <div className="fr-grid-row fr-grid-row--gutters fr-grid-row--top">
        <div className="fr-col-auto">
          <div css={thumbnailContainerStyles}>
            <img
              loading="lazy"
              alt={`Image de ${searchItem.name}`}
              width="60"
              height="60"
              src={thumbnail}
              css={thumbnailImageStyles}
            />
          </div>
        </div>
        <div className="fr-col-10">
          <SearchItemBadge searchItem={searchItem} small />

          <h3 className="fr-text--md fr-mb-0 fr-grid-row">
            <Link className="fr-grid-row" to={linkTo}>
              <div className="fr-col" css={titleContainerStyle}>
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
