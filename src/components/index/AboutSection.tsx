import { StaticImage } from "gatsby-plugin-image";
import { css } from "@emotion/react";
import { fr } from "@codegouvfr/react-dsfr";

import { BaseSection } from "./BaseSection";
import FadeInDiv from "../FadeInDiv";
import { useRef } from "react";
import useHasBeenInViewport from "../../hooks/useHasBeenInViewport";

export const AboutSection = () => {
  const elementRef = useRef<HTMLDivElement>(null);
  const hasBeenInViewport = useHasBeenInViewport(elementRef);

  return (
    <div
      css={css`
        background-color: ${fr.colors.decisions.background.actionLow.blueFrance
          .default};
      `}
      ref={elementRef}
    >
      <BaseSection
        css={css`
          text-align: center;
          ${fr.breakpoints.up("lg")} {
            text-align: left;
          }
        `}
      >
        <div className="fr-grid-row fr-grid-row--gutters">
          <div className="fr-col-12 fr-col-lg-6">
            <div>
              <h4>A propos</h4>
            </div>
            <div>
              <h3>NewAglae, Accélérateur Grand Louvre d'analyse élémentaire</h3>
            </div>
            <p
              css={css`
                ${fr.breakpoints.down("lg")} {
                  padding-left: ${fr.spacing("3w")} !important;
                  padding-right: ${fr.spacing("3w")} !important;
                }
              `}
            >
              L'Accélérateur, inauguré en 1989, est la seule installation de ce
              type dans le monde à être implantée dans un laboratoire de musée
              et dédié exclusivement à l'étude d'objets du patrimoine. AGLAE met
              en œuvre des méthodes d'analyse dérivées par faisceaux d'ions qui
              sont désormais d'un emploi courant en science des matériaux.Ces
              méthodes possèdent de très bonnes performances analytiques, mais
              sont surtout non destructives, ce qui est capital, compte tenu du
              caractère précieux et souvent unique des œuvres.
            </p>
            <a href="#">En savoir plus</a>
          </div>
          {hasBeenInViewport && (
            <FadeInDiv
              className="fr-col-12 fr-col-lg-6"
              css={css`
                text-align: center;
                background-color: ${fr.colors.decisions.background.actionLow
                  .blueFrance.default};
                ${fr.breakpoints.down("lg")} {
                  display: none;
                }
              `}
            >
              <StaticImage
                src="../../images/analyzed-object-zoomed-1.png"
                alt="Icône de calendrier"
                placeholder="blurred"
                className="fr-mr-1v"
                css={css`
                  mix-blend-mode: luminosity;
                `}
              />
              <StaticImage
                src="../../images/analyzed-object-zoomed-2.png"
                alt="Icône de calendrier"
                placeholder="blurred"
                className="fr-ml-1v"
                css={css`
                  mix-blend-mode: luminosity;
                  ${fr.breakpoints.down("xl")} {
                    display: none;
                  }
                `}
              />
            </FadeInDiv>
          )}
        </div>
      </BaseSection>
    </div>
  );
};
