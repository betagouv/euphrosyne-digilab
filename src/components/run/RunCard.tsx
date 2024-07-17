import { fr } from "@codegouvfr/react-dsfr";
import { Card } from "@codegouvfr/react-dsfr/Card";
import { Global, css } from "@emotion/react";
import { useContext } from "react";
import React from "react";

import { LangContext } from "../../contexts/LangContext";
import { ContentProps } from "../../i18n";
import { Leader } from "../../types/project";
import { type Run } from "../../types/run";
import { ellipse } from "../../utils";

export interface RunCardContent {
  date: string;
  projectLeader: string;
  experimentalCondition: string;
  methods: string;
  dataUnderEmbargo: string;
}

interface RunCardProps {
  run: Run;
  projectLeader: Leader | null;
}

const RunCardContent = ({
  run,
  projectLeader,
  content,
}: RunCardProps & ContentProps<RunCardContent>) => {
  const institutionName = projectLeader?.institutionName;
  const startDate = run.startDate
    ? new Date(run.startDate).toLocaleDateString()
    : "-";
  return (
    <div>
      <div>
        <span className="fr-hint-text">{content.date}</span>
        <p>{startDate}</p>
      </div>
      <div>
        <span className="fr-hint-text">{content.projectLeader}</span>
        <p>
          {projectLeader
            ? `${projectLeader.firstName} ${projectLeader.lastName} `
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
                  key={`${run.label}-${method.name}`}
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
                              {(detector?.filters || []).length > 0 ? ": " : ""}
                              {detector?.filters?.join(", ")}
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
export default function RunCard({ run, projectLeader }: RunCardProps) {
  const content = useContext(LangContext).translations.runCard;

  const warningTextClassName = "warning-text";
  const warningTextClass = css(`
    .${warningTextClassName} {
      color: ${fr.colors.decisions.text.default.warning.default} !important;
    }`);

  const classes = {
    detail: run.isDataEmbargoed
      ? `fr-icon-warning-fill ${warningTextClassName}`
      : "",
  };

  return (
    <React.Fragment>
      <Global styles={warningTextClass} />
      <Card
        background
        border
        detail={run.isDataEmbargoed ? content.dataUnderEmbargo : ""}
        classes={classes}
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
    </React.Fragment>
  );
}
