import { StaticImage } from "gatsby-plugin-image";
import { css } from "@emotion/react";
import { fr } from "@codegouvfr/react-dsfr";

import { BaseSection } from "./BaseSection";

export const Hero = () => (
  <div
    css={css`
      background-color: ${fr.colors.decisions.background.alt.grey.default};
    `}
  >
    <BaseSection>
      <div className="fr-grid-row fr-grid-row--gutters">
        <div className="fr-col-12 fr-col-lg-6">
          <StaticImage
            src="../../images/hero-banner.jpg"
            alt="Objet analysé par NewAglae"
            placeholder="blurred"
            css={css`
              ${fr.breakpoints.down("lg")} {
                max-height: 200px;
              }
            `}
          />
        </div>
        <div
          className="fr-col-12 fr-col-lg-6"
          css={css`
            ${fr.breakpoints.down("lg")} {
              padding-left: ${fr.spacing("3w")} !important;
              padding-right: ${fr.spacing("3w")} !important;
            }
          `}
        >
          <h1>
            Toutes les données produites par NewAglae accessibles en ligne
          </h1>
          <p>
            Euphrosyne est le service lié à NewAGLAE, l'Accélérateur Grand
            Louvre d'Analyse Elémentaire, permettant la collecte et la diffusion
            de ses données ainsi que l'accès à distance à ses outils pour les
            utilisateurs de NewAGLAE. Euphrosyne vous aide à rechercher des
            données scientifiques par mots clefs, matériaux, date ou aire
            géographique afin de répondre au mieux à vos besoin de recherches.
          </p>
        </div>
      </div>
    </BaseSection>
  </div>
);
