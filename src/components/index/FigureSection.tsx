import { fr } from "@codegouvfr/react-dsfr";
import { css } from "@emotion/react";
import React, { useRef } from "react";

import useHasBeenInViewport from "../../hooks/useHasBeenInViewport";
import AnimatedNumber from "../AnimatedNumber";
import { BaseSection } from "../BaseSection";

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

export const FigureSection: React.FC<FigureSectionProps> = ({ stats }) => {
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
        <h3>Les chiffres clefs de NewAglae</h3>
        {["all", "year"].map((key) => {
          const animatedNumberProps: [string, number][] = [
            [
              "projets d'analyse menés",
              stats ? stats[key]?.totalProjects || 0 : 0,
            ],
            ["objets analysés", stats ? stats[key]?.totalObjectGroups || 0 : 0],
            ["heures", stats ? stats[key]?.totalHours || 0 : 0],
          ];

          return (
            <>
              <h4
                css={css`
                  margin-right: auto;
                  margin-left: auto;
                `}
              >
                {key === "all"
                  ? "Depuis 2022"
                  : `En ${new Date().getFullYear()}`}
              </h4>
              <div className="fr-grid-row fr-grid-row--gutters">
                {animatedNumberProps.map(([label, number]) => (
                  <div className="fr-col-12 fr-col-lg-4 fr-px-7w fr-py-4w">
                    <h4>{isInViewport && <AnimatedNumber n={number} />}</h4>
                    <p>{label}</p>
                  </div>
                ))}
              </div>
            </>
          );
        })}
      </BaseSection>
    </div>
  );
};
