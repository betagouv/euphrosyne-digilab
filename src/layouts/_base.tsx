import { DsfrProvider } from "@codegouvfr/react-dsfr/next-appdir/DsfrProvider";
import { useState } from "react";

import {
  EuphrosyneHeader,
  EuphrosyneHeaderContent,
} from "../components/EuphrosyneHeader";
import { Footer } from "../components/Footer";
import { PageContext } from "../contexts/PageContext";
import { ContentProps, getCurrentLangKey } from "../i18n";
import { PageContext as IPageContext } from "../types/context";

export interface LayoutContentProps {
  header: EuphrosyneHeaderContent;
}

export default function Layout({
  children,
  currentPath,
  content,
}: {
  currentPath: string;
  children: React.ReactNode;
} & ContentProps<LayoutContentProps>) {
  const [currentProject, setCurrentProject] =
    useState<IPageContext["currentProject"]>(null);

  const langKey = getCurrentLangKey();

  return (
    <DsfrProvider lang={langKey}>
      <PageContext.Provider
        value={{
          currentProject,
          setCurrentProject,
        }}
      >
        <EuphrosyneHeader currentPath={currentPath} content={content.header} />
        <main>{children}</main>
        <Footer />
      </PageContext.Provider>
    </DsfrProvider>
  );
}
