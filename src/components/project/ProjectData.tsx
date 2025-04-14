import Button from "@codegouvfr/react-dsfr/Button";
import type { WindowLocation } from "@reach/router";
import { useContext } from "react";

import DataAddedAlert from "../../cart/DataAddedAlert";
import { CartContext, type ICartContext } from "../../cart/context";
import { useClosableAlert } from "../../hooks/useClosableAlert";
import { ContentProps } from "@/i18n";
import { Leader } from "../../types/project";
import { Run } from "../../types/run";
import RunCard from "../run/RunCard";

export interface ProjectDataContent {
  addToCart: string;
}

interface ProjectDataProps
  extends Omit<React.InputHTMLAttributes<HTMLDivElement>, "content"> {
  runs: readonly Run[] | null;
  projectLeader: Leader;
  location: WindowLocation;
  pageType: "project" | "objectGroup";
}

export function ProjectData({
  runs,
  projectLeader,
  className,
  content,
  location,
  pageType,
  ...props
}: ProjectDataProps & ContentProps<ProjectDataContent>) {
  const cart = useContext(CartContext);

  const notEmbargoedRuns = runs?.filter((run) => !run.isDataEmbargoed);

  const [showDataAddedAlert, setshowDataAddedAlert] = useClosableAlert();

  const onAddRunsToCart = () => {
    if (notEmbargoedRuns && notEmbargoedRuns.length > 0) {
      cart.addItems(notEmbargoedRuns as ICartContext["items"], {
        type: pageType,
        href: location.pathname + location.search,
      });
      setshowDataAddedAlert(true);
    }
  };

  return (
    <div className={`${className}`}>
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
      {runs && runs.length > 0 && (
        <div className={`fr-grid-row fr-grid-row--gutters`} {...props}>
          {runs.map((run) => (
            <div className="fr-col-12 fr-col-md-6 fr-col-lg-4" key={run.label}>
              <RunCard run={run} projectLeader={projectLeader} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
