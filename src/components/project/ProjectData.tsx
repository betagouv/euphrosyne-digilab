import { BaseSection } from "../BaseSection";
import { RunCard } from "../run/RunCard";
import * as React from "react";

interface ProjectDataProps extends React.InputHTMLAttributes<HTMLDivElement> {
  runs: Run[];
  projectLeader: Participation;
}

export const ProjectData = ({
  runs,
  projectLeader,
  ...props
}: ProjectDataProps) => {
  return (
    <BaseSection {...props}>
      <div className="fr-grid-row fr-grid-row--gutters">
        <div className="fr-col-12 fr-col-md-6">
          <h2 className="fr-mb-2w">Données du projet</h2>
        </div>
      </div>
      <div className="fr-grid-row fr-grid-row--gutters">
        {runs.map((run) => (
          <div className="fr-col-12 fr-col-md-6 fr-col-lg-4" key={run.label}>
            <RunCard run={run} projectLeader={projectLeader} />
          </div>
        ))}
      </div>
    </BaseSection>
  );
};
