import { fr } from "@codegouvfr/react-dsfr";
import { css } from "@emotion/react";
import { StaticImage } from "gatsby-plugin-image";

import { paddedUpToLg } from "../../styles";
import { BaseSection } from "../BaseSection";

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
            ${paddedUpToLg}
          `}
        >
          <h1>Les données produites par New AGLAE accessibles en ligne</h1>
          <p>
            Euphrosyne est la plateforme numérique liée à New AGLAE,
            l'Accélérateur Grand Louvre d'Analyse Elémentaire dédié aux sciences
            du patrimoine. Elle permet la collecte et la diffusion des données
            ainsi que, pour les utilisateurs de New AGLAE, l'accès à distance
            aux logiciels de traitement des analyses par faisceau d'ions
            acquises sur New AGLAE. Le catalogue des données de NewAglae vous
            aide a chercher des données scientifiques par mots-clefs (matériaux,
            date, aire géographique, etc.) afin de répondre au mieux à vos
            besoins de recherche.
          </p>
        </div>
      </div>
    </BaseSection>
  </div>
);
