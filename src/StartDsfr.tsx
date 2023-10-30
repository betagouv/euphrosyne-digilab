"use client";

import { startReactDsfr } from "@codegouvfr/react-dsfr/next-appdir";
import { defaultColorScheme } from "./defaultColorScheme";
import { Link as GatsbyLink } from "gatsby";
import { RegisteredLinkProps } from "@codegouvfr/react-dsfr/link";

const Link = ({ ...props }: RegisteredLinkProps) => {
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
