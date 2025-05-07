"use client";

import { usePathname } from "next/navigation";
import { useContext } from "react";

import { LangContext } from "@/contexts/LangContext";
import { getPathnameLangKey, localizePath } from "@/i18n";

import Breadcrumb, { BreadcrumbSegment } from "./Breadcrumb";

export default function BreadcrumbInCatalog({
  currentPageLabel,
  additionalSegments,
  ...props
}: {
  currentPageLabel: string;
  additionalSegments?: BreadcrumbSegment[];
} & React.ComponentProps<typeof Breadcrumb>) {
  const { translations } = useContext(LangContext);
  const content = translations.objectPageContent;

  const pathname = usePathname(),
    currentLang = getPathnameLangKey(pathname);

  const defaultSegments = [
    {
      label: content.catalog,
      linkProps: { href: localizePath("/catalog", currentLang) },
    },
  ];

  return (
    <Breadcrumb
      {...props}
      currentPageLabel={currentPageLabel}
      additionalSegments={[...defaultSegments, ...(additionalSegments || [])]}
    />
  );
}
