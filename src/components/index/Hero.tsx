import { fr } from "@codegouvfr/react-dsfr";
import { css } from "@emotion/react";
import { StaticImage } from "gatsby-plugin-image";

import { ContentProps } from "../../i18n";
import { paddedUpToLg } from "../../styles";
import { BaseSection } from "../BaseSection";

export interface HeroContent {
  title: string;
  description: string;
}

export const Hero: React.FC<ContentProps<HeroContent>> = ({ content }) => (
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
          <h1>{content.title}</h1>
          <p>{content.description}</p>
        </div>
      </div>
    </BaseSection>
  </div>
);
