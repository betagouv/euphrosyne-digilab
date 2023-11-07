import Button from "@codegouvfr/react-dsfr/Button";
import { RunCard } from "../run/RunCard";
import * as React from "react";

interface ProjectDataProps extends React.InputHTMLAttributes<HTMLDivElement> {
  runs: readonly Run[];
  projectLeader: Participation;
}

export const ProjectData = ({
  runs,
  projectLeader,
  className,
  ...props
}: ProjectDataProps) => {
  return (
    <div className={`${className}`}>
      <div className="fr-grid-row fr-grid-row--gutters">
        <div className="fr-col-12">
          <Button disabled>Ajouter les données au panier</Button>
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
