"use client";

import { Header } from "@codegouvfr/react-dsfr/Header";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { Suspense } from "react";

import { getTranslations } from "@/app/[lang]/dictionaries";

import CartButton from "../cart/CartButton";
import type { ContentProps, Lang, WithCurrentLang } from "../i18n";
import { changePathLocale, langs, localizePath } from "../i18n";

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
  return (
    changePathLocale(pathname, lang, currentLang) + searchParams.toString()
  );
};

const LanguageSwitcher: React.FC<
  ContentProps<LanguageSwitcherContent> & WithCurrentLang
> = ({ content, currentLang }) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

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
                  href={
                    pathname && searchParams
                      ? buildLanguageSwitchLink(
                          lang,
                          currentLang,
                          pathname,
                          searchParams
                        )
                      : "#"
                  }
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

export default function EuphrosyneHeader({ currentLang }: WithCurrentLang) {
  const currentPath = usePathname();
  const content = getTranslations(currentLang).headerContent;

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
        <Suspense key="language-switcher">
          <LanguageSwitcher
            content={content.languageSwitcher}
            currentLang={currentLang}
          />
        </Suspense>,
      ]}
      navigation={[
        {
          linkProps: {
            href: localizePath("/", currentLang),
            target: "_self",
          },
          text: content.homeLinkLabel,
          isActive:
            (currentPath + "/").replace("//", "/") ===
            localizePath("/", currentLang),
        },
        {
          linkProps: {
            href: localizePath("/catalog", currentLang),
          },
          text: content.catalogLinkLabel,
          isActive: currentPath === localizePath("/catalog", currentLang),
        },
      ]}
      serviceTitle={content.serviceTitle}
    />
  );
}
