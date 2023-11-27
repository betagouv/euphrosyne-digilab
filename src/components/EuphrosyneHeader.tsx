import { Header } from "@codegouvfr/react-dsfr/Header";
import * as React from "react";

type EuphrosyneHeaderProps = {
  currentPath: string;
};

export const EuphrosyneHeader: React.FC<EuphrosyneHeaderProps> = ({
  currentPath,
}) => (
  <Header
    brandTop="Ministère de la Culture"
    homeLinkProps={{
      to: "/",
      title: "Accueil - Euphrosyne Digilab",
    }}
    quickAccessItems={[
      {
        iconId: "fr-icon-external-link-fill",
        linkProps: {
          to: "https://euphrosyne.beta.gouv.fr",
          target: "_self",
        },
        text: "Accéder à Fixlab",
      },
    ]}
    navigation={[
      {
        linkProps: {
          to: "/",
          target: "_self",
        },
        text: "Accueil",
        isActive: currentPath === "/",
      },
      {
        linkProps: {
          to: "/catalog",
        },
        text: "Catalogue",
        isActive: currentPath === "/catalog",
      },
    ]}
    serviceTitle="Euphrosyne Digilab"
    serviceTagline="Catalogue des données de NewAglae"
  />
);
