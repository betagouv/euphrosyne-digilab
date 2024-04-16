import { PageProps } from "gatsby";

import Layout, { LayoutContentProps } from "./_base";

const layoutContent: LayoutContentProps = {
  header: {
    homeLinkTitle: "Accueil - Catalogue des données de NewAglae",
    euphrosyneLinkTitle: "Accéder à Euphrosyne",
    homeLinkLabel: "Accueil",
    catalogLinkLabel: "Catalogue",
    serviceTitle: "Catalogue des données de NewAglae",
    languageSwitcher: {
      selectLangBtnTitle: "Changer de langue",
    },
  },
};

export default function LayoutFr({
  children,
  currentPath,
}: PageProps & {
  currentPath: string;
  children: React.ReactNode;
}) {
  return (
    <Layout
      currentPath={currentPath}
      children={children}
      content={layoutContent}
      langKey="fr"
    />
  );
}
