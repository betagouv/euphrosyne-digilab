import { fr } from "@codegouvfr/react-dsfr";
import { css } from "@emotion/react";
import React, { useRef } from "react";

import useHasBeenInViewport from "../../hooks/useHasBeenInViewport";
import { ContentProps } from "../../i18n";
import AnimatedNumber from "../AnimatedNumber";
import { BaseSection } from "../BaseSection";

export interface FigureSectionContent {
  title: string;
  analyzedProjectsLabel: string;
  analyzedObjectsLabel: string;
  hoursLabel: string;
  sinceYear: string;
  inYear: string;
}

interface Stats {
  totalProjects: number | null;
  totalObjectGroups: number | null;
  totalHours: number | null;
}

interface StatsContainer {
  [key: string]: Stats | null;
  all: Stats | null;
  year: Stats | null;
}

interface FigureSectionProps {
  stats: StatsContainer | null;
}

export const FigureSection: React.FC<
  FigureSectionProps & ContentProps<FigureSectionContent>
> = ({ stats, content }) => {
  const elementRef = useRef<HTMLDivElement>(null);
  const isInViewport = useHasBeenInViewport(elementRef);

  return (
    <div className="fr-pt-10w" ref={elementRef}>
      <BaseSection
        css={css`
          background-color: ${fr.colors.decisions.background.alt.blueFrance
            .default};
          max-width: 996px;
          margin: 0 auto;
          text-align: center;
        `}
        className="fr-pb-0 fr-pt-5w"
      >
        <h3>{content.title}</h3>
        {["all", "year"].map((key) => {
          const animatedNumberProps: [string, number][] = [
            [
              content.analyzedProjectsLabel,
              stats ? stats[key]?.totalProjects || 0 : 0,
            ],
            [
              content.analyzedObjectsLabel,
              stats ? stats[key]?.totalObjectGroups || 0 : 0,
            ],
            [content.hoursLabel, stats ? stats[key]?.totalHours || 0 : 0],
          ];

          return (
            <React.Fragment key={`figure-${key}`}>
              <h4
                css={css`
                  margin-right: auto;
                  margin-left: auto;
                `}
              >
                {key === "all"
                  ? content.sinceYear.replace("{}", "2022")
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
                    <h4>{isInViewport && <AnimatedNumber n={number} />}</h4>
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
};
