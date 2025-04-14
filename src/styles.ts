import { fr } from "@codegouvfr/react-dsfr";
import { tss } from "tss-react";

export default function useSharedStyles() {
  return tss.create({
    paddedUpToLg: {
      "&&": {
        [fr.breakpoints.down("lg")]: {
          paddingLeft: fr.spacing("3w"),
          paddingRight: fr.spacing("3w"),
        },
      },
    },
    detailPageSection: {
      boxShadow: `
      inset 0 2px 0 0 var(--border-plain-blue-france),
      inset 0 -1px 0 0 var(--border-default-grey)
    `,
      paddingLeft: fr.spacing("3w"),
      paddingRight: fr.spacing("3w"),
    },
  })();
}
