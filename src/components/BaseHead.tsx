import type { HeadFC } from "gatsby";
import * as React from "react";

import { StartDsfrOnHydration } from "../dsf-bootstrap";
import {
  DsfrHead,
  getHtmlAttributes,
} from "../dsf-bootstrap/server-only-index";
import { getCurrentLangKey } from "../i18n";

export const BaseHead: HeadFC = () => {
  const currentLang = getCurrentLangKey();
  return (
    <>
      <head {...getHtmlAttributes({ lang: currentLang })} />
      <StartDsfrOnHydration />
      <DsfrHead
        preloadFonts={["Marianne-Regular", "Marianne-Medium", "Marianne-Bold"]}
      />
      <title>Catalogue des données de New AGLAE</title>
    </>
  );
};
