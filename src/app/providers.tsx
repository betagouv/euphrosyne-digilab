"use client";

import { Lang } from "@/i18n";
import { DsfrProvider } from "../dsfr-bootstrap";
import { NextAppDirEmotionCacheProvider } from "tss-react/next/appDir";
import { LangContext } from "@/contexts/LangContext";
import { getTranslations } from "./[lang]/dictionaries";
import { useState } from "react";
import { IPageContext } from "../types/context";
import { PageContext } from "@/contexts/PageContext";
import { CartContext, createCart, ICart } from "@/cart/context";

export function Providers({
  children,
  lang,
}: {
  children: React.ReactNode;
  lang: Lang;
}) {
  const translations = getTranslations(lang);
  const [currentProject, setCurrentProject] =
    useState<IPageContext["currentProject"]>(null);

  const [items, setItems] = useState<ICart["items"]>();

  return (
    <DsfrProvider lang={lang}>
      <LangContext.Provider value={{ translations }}>
        <NextAppDirEmotionCacheProvider options={{ key: "css" }}>
          <PageContext.Provider
            value={{
              currentProject,
              setCurrentProject,
            }}
          >
            <CartContext.Provider value={createCart(items, setItems)}>
              {children}
            </CartContext.Provider>
          </PageContext.Provider>
        </NextAppDirEmotionCacheProvider>
      </LangContext.Provider>
    </DsfrProvider>
  );
}
