import { PageProps } from "gatsby";
import React, { useState } from "react";

import { DsfrProvider } from "../StartDsfr";
import { CartContext, ICart, createCart } from "../cart/context";
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

  const [items, setItems] = useState<ICart["items"]>();

  return (
    <DsfrProvider lang={langKey}>
      <LangContext.Provider value={{ translations }}>
        <PageContext.Provider
          value={{
            currentProject,
            setCurrentProject,
          }}
        >
          <CartContext.Provider value={createCart(items, setItems)}>
            <EuphrosyneHeader
              currentPath={currentPath}
              content={content.header}
            />
            <main>{children}</main>
            <Footer />
          </CartContext.Provider>
        </PageContext.Provider>
      </LangContext.Provider>
    </DsfrProvider>
  );
}
