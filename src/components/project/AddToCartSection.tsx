"use client";

import Button from "@codegouvfr/react-dsfr/Button";
import { useContext } from "react";

import { CartContext, ICartContext } from "@/cart/context";
import DataAddedAlert from "@/cart/DataAddedAlert";
import { LangContext } from "@/contexts/LangContext";
import { useClosableAlert } from "@/hooks/useClosableAlert";
import { Run } from "@/types/run";

export interface AddToCartContent {
  addToCart: string;
}

export default function AddToCartSection({ runs }: { runs: Run[] }) {
  const cart = useContext(CartContext);

  const { translations } = useContext(LangContext);
  const content = translations.addToCartContent;

  const notEmbargoedRuns = runs?.filter((run) => !run.isDataEmbargoed);

  const [showDataAddedAlert, setshowDataAddedAlert] = useClosableAlert();

  const onAddRunsToCart = () => {
    if (notEmbargoedRuns && notEmbargoedRuns.length > 0) {
      cart.addItems(notEmbargoedRuns as ICartContext["items"], {
        type: "project",
        href: location.pathname + location.search,
      });
      setshowDataAddedAlert(true);
    }
  };

  return (
    <div>
      {showDataAddedAlert && <DataAddedAlert />}
      <div className="fr-grid-row fr-grid-row--gutters">
        <div className="fr-col-12">
          <Button
            onClick={onAddRunsToCart}
            disabled={!notEmbargoedRuns || notEmbargoedRuns.length === 0}
          >
            {content.addToCart}
          </Button>
        </div>
      </div>
    </div>
  );
}
