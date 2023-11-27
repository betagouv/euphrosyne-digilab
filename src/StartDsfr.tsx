"use client";

import { RegisteredLinkProps } from "@codegouvfr/react-dsfr/link";
import { startReactDsfr } from "@codegouvfr/react-dsfr/next-appdir";
import { Link as GatsbyLink } from "gatsby";

import { defaultColorScheme } from "./defaultColorScheme";

const Link = ({ ...props }: RegisteredLinkProps) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { ref, href, ...newProps } = props;
  return <GatsbyLink to={href || "#"} {...newProps} />;
};
declare module "@codegouvfr/react-dsfr/next-appdir" {
  interface RegisterLink {
    GatsbyLink: typeof Link;
  }
}

startReactDsfr({ defaultColorScheme, Link });

export function StartDsfr() {
  //Yes, leave null here.
  return null;
}
