import { fr } from "@codegouvfr/react-dsfr";
import { css } from "@emotion/react";

export const paddedUpToLg = css`
  ${fr.breakpoints.down("lg")} {
    padding-left: ${fr.spacing("3w")} !important;
    padding-right: ${fr.spacing("3w")} !important;
  }
`;
