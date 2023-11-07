import { fr } from "@codegouvfr/react-dsfr";
import { css } from "@emotion/react";

export const paddedUpToLg = css`
  ${fr.breakpoints.down("lg")} {
    padding-left: ${fr.spacing("3w")} !important;
    padding-right: ${fr.spacing("3w")} !important;
  }
`;

export const detailPageSection = css`
  box-shadow: inset 0 2px 0 0 var(--border-plain-blue-france),
    inset 0 -1px 0 0 var(--border-default-grey);
  ${paddedUpToLg};
`;
