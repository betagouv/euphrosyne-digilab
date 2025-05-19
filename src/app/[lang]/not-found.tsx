"use client";

import { usePathname } from "next/navigation";

import { I18nLink as Link } from "@/components/I18nLink";
import { getPathnameLangKey } from "@/i18n";

import { getTranslations } from "./dictionaries";

const pageStyles = {
  padding: "20px 96px",
};
const headingStyles = {
  marginTop: 0,
  marginBottom: 64,
};

const paragraphStyles = {
  marginBottom: 48,
};

export interface NotFoundPageContent {
  pageNotFound: string;
  pageNotFoundMessage: string;
  goHome: string;
}

export default function NotFound() {
  const pathname = usePathname(),
    currentLang = getPathnameLangKey(pathname);

  const content = getTranslations(currentLang).notFoundPageContent;

  return (
    <div style={pageStyles}>
      <h1 style={headingStyles}>{content.pageNotFound}</h1>
      <p style={paragraphStyles}>
        {content.pageNotFoundMessage}
        <br />
        <Link href="/">{content.goHome}</Link>.
      </p>
    </div>
  );
}
