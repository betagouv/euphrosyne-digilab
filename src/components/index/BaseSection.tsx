/** Section with padding */
import React from "react";
import { fr } from "@codegouvfr/react-dsfr";
import { Interpolation } from "@emotion/serialize";
import { Theme } from "@emotion/react";
import { css as emotionCss } from "@emotion/react";

export function BaseSection({
  className,
  children,
  css,
}: {
  className?: string;
  children?: React.ReactNode;
  css?: Interpolation<Theme>;
}) {
  const styles = [
    emotionCss({
      [fr.breakpoints.up("lg")]: {
        paddingTop: fr.spacing("7w"),
        paddingBottom: fr.spacing("7w"),
      },
    }),
    css,
  ];
  return (
    <div
      className={`fr-container fr-container--fluid ${className}`}
      css={styles}
    >
      {children}
    </div>
  );
}
