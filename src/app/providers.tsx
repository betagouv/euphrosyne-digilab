"use client";

import { useState } from "react";
import { NextAppDirEmotionCacheProvider } from "tss-react/next/appDir";

import { CartContext, ICart, createCart } from "@/cart/context";
import { LangContext } from "@/contexts/LangContext";
import { PageContext } from "@/contexts/PageContext";
import { Lang } from "@/i18n";

import { DsfrProvider } from "../dsfr-bootstrap";
import { IPageContext } from "../types/context";
import { getTranslations } from "./[lang]/dictionaries";

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
