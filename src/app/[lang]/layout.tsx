import React from "react";

import { Lang } from "@/i18n";
import {
  getHtmlAttributes,
  DsfrHead,
} from "../../dsfr-bootstrap/server-only-index";
import { Providers } from "../providers";

import "../globals.css";
import EuphrosyneHeader from "@/components/EuphrosyneHeader";

interface IRootLayoutParams {
  lang: Lang;
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
          <EuphrosyneHeader />
          {children}
        </Providers>
      </body>
    </html>
  );
}
