import { Card } from "@codegouvfr/react-dsfr/Card";
import React from "react";

import { ContentProps, Lang } from "@/i18n";

import RunDataCopyright, { RunDataCopyrightContent } from "./RunDataCopyright";
import { Leader } from "../../types/project";
import { type Run } from "../../types/run";
import { ellipse } from "../../utils";

import "./run-card.css";

export interface RunCardContent {
  date: string;
  projectLeader: string;
  experimentalCondition: string;
  methods: string;
  dataUnderEmbargo: string;
  dataCopyright: RunDataCopyrightContent;
  dateLocale: Lang;
}

interface RunCardProps {
  run: Run;
  projectLeader: Leader | null;
}

export default function RunCard({
  run,
  projectLeader,
  content,
}: RunCardProps & ContentProps<RunCardContent>) {
  const classes = {
    detail: run.isDataEmbargoed ? `fr-icon-warning-fill` : "",
  };

  return (
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
      end={
        <div className="fr-text--xs fr-mb-0">
          <RunDataCopyright
            label={run.label}
            leader={
              projectLeader
                ? `${projectLeader.firstName} ${projectLeader.lastName}`
                : null
            }
            createdAt={run.startDate}
            content={content.dataCopyright}
          />
        </div>
      }
      size="medium"
      title={ellipse(run.label, 35)}
      titleAs="h3"
      className="run-card"
    />
  );
}

const RunCardContent = ({
  run,
  projectLeader,
  content,
}: RunCardProps & ContentProps<RunCardContent>) => {
  const institutionName = projectLeader?.institutionName;
  const startDate = run.startDate
    ? new Date(run.startDate).toLocaleDateString(content.dateLocale)
    : "-";
  return (
    <>
      <span className="fr-hint-text">{content.date}</span>
      <span>{startDate}</span>
      <span className="fr-hint-text">{content.projectLeader}</span>
      <span>
        {projectLeader
          ? `${projectLeader.firstName} ${projectLeader.lastName} `
          : ""}
        {institutionName &&
          `[${
            institutionName.charAt(0).toUpperCase() + institutionName.slice(1)
          }]`}
      </span>
      <span className="fr-hint-text">{content.experimentalCondition}</span>
      <span
        style={{
          display: "flex",
          justifyContent: "space-between",
          maxWidth: "400px",
        }}
      >
        <span>{run.particleType || "-"}</span>
        <span>{run.energyInKev ? `${run.energyInKev} KeV` : "-"}</span>
        <span>{run.beamline}</span>
      </span>
      <span className="fr-hint-text">{content.methods}</span>
      <span className="fr-grid-row">
        {run.methods?.map(
          (method) =>
            method && (
              <span
                className="fr-col-6"
                style={{
                  display: "flex",
                }}
                key={`${run.label}-${method.name}`}
              >
                <span>
                  <strong>{method.name}</strong>
                </span>
                <span className="fr-ml-2v">
                  {method.detectors?.map(
                    (detector) =>
                      detector && (
                        <span
                          key={`${run.label}-${method.name}-${detector.name}`}
                        >
                          <span>
                            {detector.name}
                            {(detector?.filters || []).length > 0 ? ": " : ""}
                            {detector?.filters?.join(", ")}
                          </span>
                          <br />
                        </span>
                      ),
                  )}
                  {!method.detectors ||
                    (method.detectors?.length === 0 && <span>-</span>)}
                </span>
              </span>
            ),
        )}
      </span>
    </>
  );
};
