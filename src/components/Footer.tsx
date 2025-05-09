import { headerFooterDisplayItem } from "@codegouvfr/react-dsfr/Display";
import {
  Footer as DsfrFooter,
  FooterProps,
} from "@codegouvfr/react-dsfr/Footer";
import React from "react";

import { getTranslations } from "@/app/[lang]/dictionaries";
import { localizePath, type WithCurrentLang } from "@/i18n";

export function Footer({ currentLang }: WithCurrentLang) {
  const translations = getTranslations(currentLang);
  const content = translations.footerContent;

  const contentDescription = (
    <>
      {content.description.split("{link}")[0]}
      <a
        href={"https://c2rmf.fr/aglae-0"}
        target="_blank"
        rel="noopener noreferrer"
      >
        New AGLAE
      </a>
      {content.description.split("{link}")[1]}
    </>
  );

  const bottomItems: FooterProps.BottomItem[] = [
    ...content.bottomItems.map((item: { href: string; text: string }) => ({
      linkProps: { href: item.href },
      text: item.text,
    })),
    headerFooterDisplayItem,
  ];

  return (
    <DsfrFooter
      accessibility="non compliant"
      contentDescription={contentDescription}
      termsLinkProps={content.termsLink}
      bottomItems={bottomItems}
      brandTop="Ministère de la Culture"
      homeLinkProps={{
        href: localizePath("/", currentLang),
        title: content.homeLinkTitle,
      }}
    />
  );
}
