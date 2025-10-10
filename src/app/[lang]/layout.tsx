import { Metadata } from "next";
import React from "react";

import { Lang, getPathnameLangKey } from "@/i18n";

import Layout from "../Layout";
import "../globals.css";
import { getTranslations } from "./dictionaries";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  // read route params
  const { lang: langParam } = await params;
  const lang = getPathnameLangKey(`/${langParam}`) as Lang;
  const translations = getTranslations(lang);

  return { title: translations.base.siteTitle };
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang: langParam } = await params;
  const lang = getPathnameLangKey(`/${langParam}`) as Lang;
  return <Layout params={{ lang }}>{children}</Layout>;
}
