import { css } from "@emotion/react";
import { HeadFC, PageProps } from "gatsby";
import * as React from "react";

import { BaseHead } from "../components/BaseHead";
import { I18nLink as Link } from "../components/I18nLink";
import { getCurrentLangKey } from "../i18n";
import { notFoundPageContent as enTranslations } from "../locales/en";
import { notFoundPageContent as frTranslations } from "../locales/fr";

const pageStyles = css({
  padding: "96px",
});
const headingStyles = css({
  marginTop: 0,
  marginBottom: 64,
});

const paragraphStyles = css({
  marginBottom: 48,
});

export interface NotFoundPageContent {
  pageNotFound: string;
  pageNotFoundMessage: string;
  goHome: string;
}

const NotFoundPage: React.FC<PageProps> = () => {
  const currentLang = getCurrentLangKey();
  const translations = currentLang === "fr" ? frTranslations : enTranslations;

  return (
    <main css={pageStyles}>
      <h1 css={headingStyles}>{translations.pageNotFound}</h1>
      <p css={paragraphStyles}>
        {translations.pageNotFoundMessage}
        <br />
        <Link to="/">{translations.goHome}</Link>.
      </p>
    </main>
  );
};

export default NotFoundPage;

export const Head: HeadFC = BaseHead;
