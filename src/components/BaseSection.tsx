/** Section with padding */
import { fr } from "@codegouvfr/react-dsfr";
import { Theme } from "@emotion/react";
import { css as emotionCss } from "@emotion/react";
import { Interpolation } from "@emotion/serialize";
import React from "react";

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
