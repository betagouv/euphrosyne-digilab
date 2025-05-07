"use client";

import { fr } from "@codegouvfr/react-dsfr";
import Button from "@codegouvfr/react-dsfr/Button";
import { usePathname, useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { tss } from "tss-react";

import { LangContext } from "../contexts/LangContext";
import { getPathnameLangKey, localizePath } from "../i18n";

import { CartContext } from "./context";

export interface CartButtonContent {
  title: string;
}

export default function CartButton() {
  const cart = useContext(CartContext);

  const pathname = usePathname(),
    currentLang = getPathnameLangKey(pathname);

  const [numItems, setNumItems] = useState<number>(0);

  useEffect(() => {
    setNumItems(cart.items.length);
  }, [cart.items]);

  const { classes, cx } = tss.create({
    button: {
      position: "relative",
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
    },
  })();

  const { translations } = useContext(LangContext);

  const router = useRouter();
  return (
    <div>
      <Button
        iconId="fr-icon-shopping-cart-2-line"
        onClick={() => router.push(localizePath("/cart", currentLang))}
        priority="tertiary no outline"
        title={translations.cartButton.title}
        className={numItems > 0 ? cx([classes.button]) : undefined}
      />
    </div>
  );
}
