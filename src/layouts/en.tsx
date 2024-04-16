import { PageProps } from "gatsby";

import Layout, { LayoutContentProps } from "./_base";

const layoutContent: LayoutContentProps = {
  header: {
    homeLinkTitle: "Home - NewAglae Data Catalog",
    euphrosyneLinkTitle: "Access Euphrosyne",
    homeLinkLabel: "Home",
    catalogLinkLabel: "Catalog",
    serviceTitle: "NewAglae Data Catalog",
    languageSwitcher: {
      selectLangBtnTitle: "Change language",
    },
  },
};

export default function LayoutEn({
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
      langKey="en"
    />
  );
}
