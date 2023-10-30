import {
  Footer as DsfrFooter,
  FooterProps,
} from "@codegouvfr/react-dsfr/Footer";
import { headerFooterDisplayItem } from "@codegouvfr/react-dsfr/Display";

const contentDescription = () => (
  <p>
    Euphrosyne, ouvrir les données de{" "}
    <a href="https://c2rmf.fr/aglae-0" target="_blank">
      New AGLAE
    </a>
    .
  </p>
);

export const Footer = () => {
  const bottomItems: FooterProps.BottomItem[] = [
    {
      linkProps: {
        href: "/legal/donnees-personnelles",
      },
      text: "Données personnelles et Cookies",
    },
    {
      linkProps: {
        href: "/legal/cgu",
      },
      text: "Conditions générales d'utilisation",
    },
  ];
  return (
    <DsfrFooter
      accessibility="non compliant"
      contentDescription={contentDescription()}
      termsLinkProps={{
        href: "/legal/mentions-legales",
      }}
      bottomItems={[...bottomItems, headerFooterDisplayItem]}
    />
  );
};
