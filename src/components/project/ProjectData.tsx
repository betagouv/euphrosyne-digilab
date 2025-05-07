import { ContentProps } from "@/i18n";

import { Leader } from "../../types/project";
import { Run } from "../../types/run";
import RunCard, { RunCardContent } from "../run/RunCard";

import AddToCartSection from "./AddToCartSection";

interface ProjectDataProps
  extends Omit<React.InputHTMLAttributes<HTMLDivElement>, "content"> {
  runs: Run[];
  projectLeader: Leader;
}

export function ProjectData({
  runs,
  projectLeader,
  content,
  ...props
}: ProjectDataProps & ContentProps<RunCardContent>) {
  return (
    <div {...props}>
      <AddToCartSection runs={runs} />
      {runs.length > 0 && (
        <div className={`fr-grid-row fr-grid-row--gutters`} {...props}>
          {runs.map((run) => (
            <div className="fr-col-12 fr-col-md-6 fr-col-lg-4" key={run.label}>
              <RunCard
                run={run}
                projectLeader={projectLeader}
                content={content}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
