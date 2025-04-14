"use client";

import { Header } from "@codegouvfr/react-dsfr/Header";
import * as React from "react";

import CartButton from "../cart/CartButton";
import type { ContentProps, Lang } from "../i18n";
import {
  changePathLocale,
  getCurrentLangKey,
  langs,
  localizePath,
} from "../i18n";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useContext } from "react";
import { LangContext } from "@/contexts/LangContext";

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

type LangNames = {
  [key in Lang]: string;
};

const langNames: LangNames = {
  fr: "Français",
  en: "English",
};

const buildLanguageSwitchLink = (
  lang: Lang,
  currentLang: Lang,
  pathname: string,
  searchParams: URLSearchParams
) => {
  //if (typeof window === "undefined") return `/${lang}`;
  return (
    changePathLocale(pathname, lang, currentLang) + searchParams.toString()
  );
};

const LanguageSwitcher: React.FC<ContentProps<LanguageSwitcherContent>> = ({
  content,
}) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
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
                  href={buildLanguageSwitchLink(
                    lang,
                    currentLang,
                    pathname,
                    searchParams
                  )}
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

export default function EuphrosyneHeader() {
  const currentPath = usePathname();
  const content = useContext(LangContext).translations.layoutContent.header;
  const currentLang = getCurrentLangKey();

  return (
    <Header
      brandTop="Ministère de la Culture"
      homeLinkProps={{
        href: ``,
        title: content.homeLinkTitle,
      }}
      quickAccessItems={[
        {
          iconId: "fr-icon-external-link-fill",
          linkProps: {
            href: "https://euphrosyne.beta.gouv.fr",
            target: "_self",
          },
          text: content.euphrosyneLinkTitle,
        },
        <CartButton key="cart-btn" />,
        <LanguageSwitcher
          content={content.languageSwitcher}
          key="language-switcher"
        />,
      ]}
      navigation={[
        {
          linkProps: {
            href: localizePath("/", currentLang),
            target: "_self",
          },
          text: content.homeLinkLabel,
          isActive: currentPath + "/" === localizePath("/", currentLang),
        },
        {
          linkProps: {
            href: localizePath("/catalog", currentLang),
          },
          text: content.catalogLinkLabel,
          isActive: currentPath + "/" === localizePath("/catalog", currentLang),
        },
      ]}
      serviceTitle={content.serviceTitle}
    />
  );
}
