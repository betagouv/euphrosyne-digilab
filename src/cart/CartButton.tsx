"use client";

import { fr } from "@codegouvfr/react-dsfr";
import Button from "@codegouvfr/react-dsfr/Button";
import { css } from "@emotion/react";
import { useContext } from "react";

import { LangContext } from "../contexts/LangContext";
import { localizePathToCurrenLange } from "../i18n";
import { CartContext } from "./context";
import { useRouter } from "next/navigation";

export interface CartButtonContent {
  title: string;
}

const buttonStyle = css({
  position: "relative",
});
export default function CartButton() {
  const cart = useContext(CartContext);
  const numItems = cart.items.length;

  const buttonWithCountStyle = css({
    "::after": {
      content: `"${numItems.toLocaleString()}"`,
      fontSize: "0.9em",
      borderRadius: "50%",
      position: "absolute",
      left: "18px",
      top: "-8px",
      maskImage: "none !important",
      background: `${fr.colors.decisions.text.actionHigh.redMarianne.default} !important`,
      color: `${fr.colors.decisions.text.inverted.grey.default} !important`,
    },
  });

  const { translations } = useContext(LangContext);

  const router = useRouter();
  return (
    <div>
      <Button
        iconId="fr-icon-shopping-cart-2-line"
        onClick={() => router.push(localizePathToCurrenLange("/cart"))}
        priority="tertiary no outline"
        title={translations.cartButton.title}
        css={numItems > 0 ? [buttonStyle, buttonWithCountStyle] : undefined}
      />
    </div>
  );
}
