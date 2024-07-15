import Button from "@codegouvfr/react-dsfr/Button";
import type { WindowLocation } from "@reach/router";
import { useContext } from "react";

import { CartContext, type ICartContext } from "../../cart/context";
import { ContentProps } from "../../i18n";
import { Leader } from "../../types/project";
import { Run } from "../../types/run";
import { RunCard, RunCardContent } from "../run/RunCard";

export interface ProjectDataContent {
  addToCart: string;
  runCard: RunCardContent;
}

interface ProjectDataProps
  extends Omit<React.InputHTMLAttributes<HTMLDivElement>, "content"> {
  runs: readonly Run[] | null;
  projectLeader: Leader;
  location: WindowLocation;
  pageType: "project" | "objectGroup";
}

export const ProjectData = ({
  runs,
  projectLeader,
  className,
  content,
  location,
  pageType,
  ...props
}: ProjectDataProps & ContentProps<ProjectDataContent>) => {
  const cart = useContext(CartContext);

  return (
    <div className={`${className}`}>
      <div className="fr-grid-row fr-grid-row--gutters">
        <div className="fr-col-12">
          <Button
            onClick={() =>
              runs &&
              cart.addItems(runs as ICartContext["items"], {
                type: pageType,
                href: location.pathname + location.search,
              })
            }
            disabled={!runs || runs.length === 0}
          >
            {content.addToCart}
          </Button>
        </div>
      </div>
      {runs && runs.length > 0 && (
        <div className={`fr-grid-row fr-grid-row--gutters`} {...props}>
          {runs.map((run) => (
            <div className="fr-col-12 fr-col-md-6 fr-col-lg-4" key={run.label}>
              <RunCard
                run={run}
                projectLeader={projectLeader}
                content={content.runCard}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
