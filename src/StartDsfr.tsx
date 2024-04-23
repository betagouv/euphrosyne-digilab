"use client";

import { startReactDsfr } from "@codegouvfr/react-dsfr/next-appdir";

import { I18nLink as Link } from "./components/I18nLink";
import { defaultColorScheme } from "./defaultColorScheme";

declare module "@codegouvfr/react-dsfr/next-appdir" {
  interface RegisterLink {
    Link: typeof Link;
  }
}

startReactDsfr({ defaultColorScheme, Link });

export function StartDsfr() {
  //Yes, leave null here.
  return null;
}
