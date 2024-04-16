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
  projectLeader: Participation;
}

const RunCardContent = ({
  run,
  projectLeader,
  content,
}: RunCardProps & ContentProps<RunCardContent>) => {
  const { firstName, lastName } = projectLeader.user;
  const institutionName = projectLeader.institution?.name;
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
          {firstName} {lastName}{" "}
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
                          <div>
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
