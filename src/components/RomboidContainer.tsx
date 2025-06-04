"use client";
import { fr } from "@codegouvfr/react-dsfr";
import { tss } from "tss-react";

export default function RomboidContainer({
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const { className, ...otherProps } = props;
  const useStyles = tss.create({
    romboidStyle: {
      backgroundColor: fr.colors.decisions.background.alt.blueFrance.default,
      color: fr.colors.decisions.text.actionHigh.blueFrance.default,
      transform: "skew(-20deg)",
      padding: fr.spacing("1v"),
    },
  });
  const { classes, cx } = useStyles();

  return (
    <div className={cx(classes.romboidStyle, className)} {...otherProps}>
      {children}
    </div>
  );
}
