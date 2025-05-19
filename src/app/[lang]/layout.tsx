import { Metadata } from "next";
import React from "react";

import Layout, { ILayoutParams } from "../Layout";
import "../globals.css";
import { getTranslations } from "./dictionaries";

export async function generateMetadata({
  params,
}: {
  params: Promise<ILayoutParams>;
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
  params: Promise<ILayoutParams>;
}) {
  const awaitedParams = await params;
  return <Layout params={awaitedParams}>{children}</Layout>;
}
