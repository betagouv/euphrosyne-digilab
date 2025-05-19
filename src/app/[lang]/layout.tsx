import { Metadata } from "next";
import React from "react";

import EuphrosyneHeader from "@/components/EuphrosyneHeader";
import { Footer } from "@/components/Footer";
import { Lang } from "@/i18n";

import {
  DsfrHead,
  getHtmlAttributes,
} from "../../dsfr-bootstrap/server-only-index";
import "../globals.css";
import { Providers } from "../providers";
import { getTranslations } from "./dictionaries";

interface IRootLayoutParams {
  lang: Lang;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<IRootLayoutParams>;
}): Promise<Metadata> {
  // read route params
  const { lang } = await params;
  const translations = getTranslations(lang);

  return {
    title: translations.base.siteTitle,
  };
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<IRootLayoutParams>;
}) {
  const { lang } = await params;
  return (
    <html {...getHtmlAttributes({ lang })}>
      <head>
        <DsfrHead />
      </head>
      <body>
        <Providers lang={lang}>
          <EuphrosyneHeader currentLang={lang} />
          {children}
          <Footer currentLang={lang} />
        </Providers>
      </body>
    </html>
  );
}
