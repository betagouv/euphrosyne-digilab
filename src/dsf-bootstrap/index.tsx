"use client";

import {
  DsfrProviderBase,
  DsfrProviderProps,
  StartDsfrOnHydration,
} from "@codegouvfr/react-dsfr/next-app-router";

import { I18nLink as Link } from "../components/I18nLink";
import { defaultColorScheme } from "./defaultColorScheme";

declare module "@codegouvfr/react-dsfr/next-app-router" {
  interface RegisterLink {
    Link: typeof Link;
  }
}

export function DsfrProvider(props: DsfrProviderProps) {
  return (
    <DsfrProviderBase
      defaultColorScheme={defaultColorScheme}
      Link={Link}
      {...props}
    />
  );
}

export { StartDsfrOnHydration };
