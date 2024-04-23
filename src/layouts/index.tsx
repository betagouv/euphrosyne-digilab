import { DsfrProvider } from "@codegouvfr/react-dsfr/next-appdir/DsfrProvider";
import { PageProps } from "gatsby";
import React, { useState } from "react";

import {
  EuphrosyneHeader,
  EuphrosyneHeaderContent,
} from "../components/EuphrosyneHeader";
import { Footer } from "../components/Footer";
import { LangContext } from "../contexts/LangContext";
import { PageContext } from "../contexts/PageContext";
import useTranslations from "../hooks/useTranslations";
import { Lang } from "../i18n";
import { PageContext as IPageContext } from "../types/context";

export interface LayoutContentProps {
  header: EuphrosyneHeaderContent;
}

interface PageContext {
  langKey: string;
}

export default function Layout({
  children,
  currentPath,
  langKey,
  pageContext,
}: {
  currentPath: string;
  langKey: string;
} & PageProps) {
  const lang = (pageContext as PageContext).langKey;

  const translations = useTranslations(lang as Lang);

  const [currentProject, setCurrentProject] =
    useState<IPageContext["currentProject"]>(null);

  const content = translations.layoutContent;

  return (
    <DsfrProvider lang={langKey}>
      <LangContext.Provider value={{ translations }}>
        <PageContext.Provider
          value={{
            currentProject,
            setCurrentProject,
          }}
        >
          <React.Fragment>
            <EuphrosyneHeader
              currentPath={currentPath}
              content={content.header}
            />
            <main>{children}</main>
            <Footer />
          </React.Fragment>
        </PageContext.Provider>
      </LangContext.Provider>
    </DsfrProvider>
  );
}
