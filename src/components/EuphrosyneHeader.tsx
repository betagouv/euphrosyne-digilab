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
      title: "Accueil - Catalogue des données de NewAglae",
    }}
    quickAccessItems={[
      {
        iconId: "fr-icon-external-link-fill",
        linkProps: {
          to: "https://euphrosyne.beta.gouv.fr",
          target: "_self",
        },
        text: "Accéder à Euphrosyne",
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
    serviceTitle="Catalogue des données de NewAglae"
  />
);
