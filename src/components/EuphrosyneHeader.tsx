import * as React from "react";
import { Header } from "@codegouvfr/react-dsfr/Header";

type EuphrosyneHeaderProps = {
  currentPath: string;
};

export const EuphrosyneHeader: React.FC<EuphrosyneHeaderProps> = ({
  currentPath,
}) => (
  <Header
    brandTop="Ministère de la Culture"
    homeLinkProps={{
      href: "/",
      title: "Accueil - Euphrosyne Digilab",
    }}
    quickAccessItems={[
      {
        iconId: "fr-icon-external-link-fill",
        linkProps: {
          href: "https://euphrosyne.beta.gouv.fr",
        },
        text: "Accéder à Fixlab",
      },
    ]}
    navigation={[
      {
        linkProps: {
          href: "/",
          target: "_self",
        },
        text: "Accueil",
        isActive: currentPath === "/",
      },
    ]}
    serviceTitle="Euphrosyne Digilab"
    serviceTagline="Catalogue des données de NewAglae"
  />
);
