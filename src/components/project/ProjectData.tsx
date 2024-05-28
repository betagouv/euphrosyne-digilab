import Button from "@codegouvfr/react-dsfr/Button";
import * as React from "react";

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
}

export const ProjectData = ({
  runs,
  projectLeader,
  className,
  content,
  ...props
}: ProjectDataProps & ContentProps<ProjectDataContent>) => {
  return (
    <div className={`${className}`}>
      <div className="fr-grid-row fr-grid-row--gutters">
        <div className="fr-col-12">
          <Button disabled>{content.addToCart}</Button>
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
