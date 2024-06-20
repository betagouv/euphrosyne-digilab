import { Header } from "@codegouvfr/react-dsfr/Header";
import { Link } from "gatsby";
import * as React from "react";

import type { ContentProps, Lang } from "../i18n";
import { changePathLocale, getCurrentLangKey, langs } from "../i18n";

interface LanguageSwitcherContent {
  selectLangBtnTitle: string;
}

export interface EuphrosyneHeaderContent {
  languageSwitcher: LanguageSwitcherContent;
  homeLinkTitle: string;
  euphrosyneLinkTitle: string;
  homeLinkLabel: string;
  catalogLinkLabel: string;
  serviceTitle: string;
}

interface EuphrosyneHeaderProps extends ContentProps<EuphrosyneHeaderContent> {
  currentPath: string;
}

type LangNames = {
  [key in Lang]: string;
};

const langNames: LangNames = {
  fr: "Français",
  en: "English",
};

const buildLanguageSwitchLink = (lang: Lang, currentLang: Lang) => {
  if (typeof window === "undefined") return `/${lang}`;
  return (
    changePathLocale(location.pathname, lang, currentLang) + location.search
  );
};

const LanguageSwitcher: React.FC<ContentProps<LanguageSwitcherContent>> = ({
  content,
}) => {
  const currentLang = getCurrentLangKey();

  return (
    <nav role="navigation" className="fr-translate fr-nav">
      <div className="fr-nav__item">
        <button
          className="fr-translate__btn fr-btn fr-btn--tertiary"
          aria-controls="translate"
          aria-expanded="false"
          title={content.selectLangBtnTitle}
        >
          {currentLang.toUpperCase()}
          <span className="fr-hidden-lg"> - {langNames[currentLang]}</span>
        </button>
        <div className="fr-collapse fr-translate__menu fr-menu" id="translate">
          <ul className="fr-menu__list">
            {langs.map((lang) => (
              <li key={lang}>
                <Link
                  className="fr-translate__language fr-nav__link"
                  hrefLang={lang}
                  lang={lang}
                  to={buildLanguageSwitchLink(lang, currentLang)}
                  aria-current={lang === currentLang ? "true" : undefined}
                >
                  {lang.toUpperCase()} - {langNames[lang]}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export const EuphrosyneHeader: React.FC<EuphrosyneHeaderProps> = ({
  currentPath,
  content,
}) => {
  return (
    <Header
      brandTop="Ministère de la Culture"
      homeLinkProps={{
        to: `/`,
        title: content.homeLinkTitle,
      }}
      quickAccessItems={[
        {
          iconId: "fr-icon-external-link-fill",
          linkProps: {
            to: "https://euphrosyne.beta.gouv.fr",
            target: "_self",
          },
          text: content.euphrosyneLinkTitle,
        },
        <LanguageSwitcher content={content.languageSwitcher} />,
      ]}
      navigation={[
        {
          linkProps: {
            to: "/",
            target: "_self",
          },
          text: content.homeLinkLabel,
          isActive: currentPath === "/",
        },
        {
          linkProps: {
            to: "/catalog",
          },
          text: content.catalogLinkLabel,
          isActive: currentPath === "/catalog",
        },
      ]}
      serviceTitle={content.serviceTitle}
    />
  );
};
