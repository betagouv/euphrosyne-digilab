import { fr } from "@codegouvfr/react-dsfr";
import { css } from "@emotion/react";
import { StaticImage } from "gatsby-plugin-image";
import { useRef } from "react";

import useHasBeenInViewport from "../../hooks/useHasBeenInViewport";
import { paddedUpToLg } from "../../styles";
import { BaseSection } from "../BaseSection";
import FadeInDiv from "../FadeInDiv";

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
                ${paddedUpToLg}
              `}
            >
              AGLAE, acronyme pour "Accélérateur Grand Louvre d'Analyse
              Élémentaire," est un grand instrument unique, situé au sein même
              du Palais du Louvre. Depuis son installation en 1988, AGLAE est le
              seul accélérateur de particules au monde dédié aux sciences du
              patrimoine, utilisant des techniques avancées pour décrypter les
              secrets enfouis dans les œuvres d'art. Lauréat de l'Investissement
              d'Avenir de l'Agence Nationale de la Recherche (ANR-10-EQPX-22),
              AGLAE est devenu New AGLAE en 2017. Complètement automatisée, la
              ligne de faisceau est dorénavant susceptible de fonctionner
              24h/24.
            </p>
            <a href="https://c2rmf.fr/aglae">En savoir plus</a>
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
