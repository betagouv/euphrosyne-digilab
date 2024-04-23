import { Card } from "@codegouvfr/react-dsfr/Card";
import { css } from "@emotion/react";

import { ContentProps } from "../../i18n";
import { Participation } from "../../types/project";
import { Run } from "../../types/run";
import { ellipse } from "../../utils";

export interface RunCardContent {
  date: string;
  projectLeader: string;
  experimentalCondition: string;
  methods: string;
}

interface RunCardProps {
  run: Run;
  projectLeader: Participation | null;
}

const RunCardContent = ({
  run,
  projectLeader,
  content,
}: RunCardProps & ContentProps<RunCardContent>) => {
  const institutionName = projectLeader?.institution?.name;
  const startDate = new Date(run.startDate);
  return (
    <div>
      <div>
        <span className="fr-hint-text">{content.date}</span>
        <p>{startDate.toLocaleDateString()}</p>
      </div>
      <div>
        <span className="fr-hint-text">{content.projectLeader}</span>
        <p>
          {projectLeader && projectLeader.user
            ? `${projectLeader.user.firstName} ${projectLeader.user.lastName} `
            : ""}
          {institutionName &&
            `[${
              institutionName.charAt(0).toUpperCase() + institutionName.slice(1)
            }]`}
        </p>
      </div>
      <div>
        <span className="fr-hint-text">{content.experimentalCondition}</span>
        <div
          css={css`
            display: flex;
            justify-content: space-between;
            max-width: 400px;
          `}
        >
          <span>{run.particleType || "-"}</span>
          <span>{run.energyInKev ? `${run.energyInKev} KeV` : "-"}</span>
          <span>{run.beamline}</span>
        </div>
      </div>
      <div>
        <span className="fr-hint-text">{content.methods}</span>
        <div className="fr-grid-row">
          {run.methods?.map(
            (method) =>
              method && (
                <div
                  className="fr-col-6"
                  css={css`
                    display: flex;
                  `}
                >
                  <div>
                    <strong>{method.name}</strong>
                  </div>
                  <div className="fr-ml-2v">
                    {method.detectors?.map(
                      (detector) =>
                        detector && (
                          <div
                            key={`${run.label}-${method.name}-${detector.name}`}
                          >
                            <span>
                              {detector.name}
                              {detector.filters.length > 0 ? ": " : ""}
                              {detector.filters.join(", ")}
                            </span>
                          </div>
                        ),
                    )}
                  </div>
                </div>
              ),
          )}
        </div>
      </div>
    </div>
  );
};
export const RunCard = ({
  run,
  projectLeader,
  content,
}: RunCardProps & ContentProps<RunCardContent>) => {
  return (
    <Card
      background
      border
      desc={
        <RunCardContent
          run={run}
          projectLeader={projectLeader}
          content={content}
        />
      }
      size="medium"
      title={ellipse(run.label, 35)}
      titleAs="h3"
    />
  );
};
