import { Metadata } from "next";
import React from "react";

import { getTranslations } from "../[lang]/dictionaries";
import Layout from "../Layout";
import "../globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const translations = getTranslations("en");

  return {
    title: translations.base.siteTitle,
  };
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Layout params={{ lang: "en" }}>{children}</Layout>;
}
