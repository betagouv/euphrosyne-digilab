import React from "react";

import EuphrosyneHeader from "@/components/EuphrosyneHeader";
import { Footer } from "@/components/Footer";
import { Lang } from "@/i18n";

import { Providers } from "./providers";
import {
  DsfrHead,
  getHtmlAttributes,
} from "../dsfr-bootstrap/server-only-index";

import "./globals.css";

export interface ILayoutParams {
  lang: Lang;
}

export default function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: ILayoutParams;
}) {
  const { lang } = params;
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
