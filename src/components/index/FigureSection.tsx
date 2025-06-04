import React from "react";

import { fetchStats } from "@/clients/stats";
import { ContentProps } from "@/i18n";

import { BaseSection } from "../BaseSection";
import styles from "./FigureSection.module.css";

export interface FigureSectionContent {
  title: string;
  analyzedProjectsLabel: string;
  analyzedObjectsLabel: string;
  hoursLabel: string;
  sinceYear: string;
  inYear: string;
}

export default async function FigureSection({
  content,
}: ContentProps<FigureSectionContent>) {
  const stats = await fetchStats();

  return (
    <div className="fr-pt-10w">
      <BaseSection className={`fr-pb-0 fr-pt-5w ${styles.container}`}>
        <h3>{content.title}</h3>
        {["all", "year"].map((key) => {
          const animatedNumberProps: [string, number][] = [
            [content.analyzedProjectsLabel, stats[key]!.totalProjects],
            [content.analyzedObjectsLabel, stats[key]!.totalObjectGroups],
            [content.hoursLabel, stats[key]!.totalHours],
          ];

          return (
            <React.Fragment key={`figure-${key}`}>
              <h4 className={styles.h4}>
                {key === "all"
                  ? content.sinceYear.replace("{}", "2023")
                  : content.inYear.replace(
                      "{}",
                      new Date().getFullYear().toString(),
                    )}
              </h4>
              <div className="fr-grid-row fr-grid-row--gutters">
                {animatedNumberProps.map(([label, number]) => (
                  <div
                    className="fr-col-12 fr-col-lg-4 fr-px-7w fr-py-4w"
                    key={`figure-${key}-${label}`}
                  >
                    <h4>{number}</h4>
                    <p>{label}</p>
                  </div>
                ))}
              </div>
            </React.Fragment>
          );
        })}
      </BaseSection>
    </div>
  );
}
