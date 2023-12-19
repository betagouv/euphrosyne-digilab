import { headerFooterDisplayItem } from "@codegouvfr/react-dsfr/Display";
import {
  Footer as DsfrFooter,
  FooterProps,
} from "@codegouvfr/react-dsfr/Footer";
import React from "react";

const contentDescription = () => (
  <>
    Euphrosyne, ouvrir les données de{" "}
    <a href="https://c2rmf.fr/aglae-0" target="_blank">
      NewAglae
    </a>
    .
  </>
);

export const Footer = () => {
  const bottomItems: FooterProps.BottomItem[] = [
    {
      linkProps: {
        to: "/legal/donnees-personnelles",
      },
      text: "Données personnelles et Cookies",
    },
    {
      linkProps: {
        to: "/legal/cgu",
      },
      text: "Conditions générales d'utilisation",
    },
  ];
  return (
    <DsfrFooter
      accessibility="non compliant"
      contentDescription={contentDescription()}
      termsLinkProps={{
        to: "/legal/mentions-legales",
      }}
      bottomItems={[...bottomItems, headerFooterDisplayItem]}
    />
  );
};
