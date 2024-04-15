import Button from "@codegouvfr/react-dsfr/Button";
import * as React from "react";

import { ContentProps } from "../../i18n";
import { Participation } from "../../types/project";
import { Run } from "../../types/run";
import { RunCard } from "../run/RunCard";

export interface ProjectDataContent {
  addToCart: string;
}

interface ProjectDataProps
  extends Omit<React.InputHTMLAttributes<HTMLDivElement>, "content"> {
  runs: readonly Run[];
  projectLeader: Participation;
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

      <div className={`fr-grid-row fr-grid-row--gutters`} {...props}>
        {runs.map((run) => (
          <div className="fr-col-12 fr-col-md-6 fr-col-lg-4" key={run.label}>
            <RunCard run={run} projectLeader={projectLeader} />
          </div>
        ))}
      </div>
    </div>
  );
};
