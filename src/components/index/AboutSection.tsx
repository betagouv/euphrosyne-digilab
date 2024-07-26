import { fr } from "@codegouvfr/react-dsfr";
import { css } from "@emotion/react";
import { StaticImage } from "gatsby-plugin-image";
import { useRef } from "react";

import useHasBeenInViewport from "../../hooks/useHasBeenInViewport";
import { ContentProps } from "../../i18n";
import { paddedUpToLg } from "../../styles";
import { BaseSection } from "../BaseSection";
import FadeInDiv from "../FadeInDiv";

export interface AboutSectionContent {
  title: string;
  newAglae: string;
  description: string;
  moreInfo: string;
  img1Alt: string;
  img2Alt: string;
}

export const AboutSection: React.FC<ContentProps<AboutSectionContent>> = ({
  content,
}) => {
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
              <h4>{content.title}</h4>
            </div>
            <div>
              <h3>{content.newAglae}</h3>
            </div>
            <p
              css={css`
                ${paddedUpToLg}
              `}
            >
              {content.description}
            </p>
            <a href="https://c2rmf.fr/aglae">{content.moreInfo}</a>
          </div>
          {hasBeenInViewport && (
            <FadeInDiv
              className="fr-col-12 fr-col-lg-6"
              css={css`
                display: flex;
                background-color: ${fr.colors.decisions.background.actionLow
                  .blueFrance.default};
                ${fr.breakpoints.down("lg")} {
                  display: none;
                }
                ${fr.breakpoints.down("xl")} {
                  text-align: center;
                }
              `}
            >
              <div
                className="fr-col-lg-6"
                css={css(`
                  ${fr.breakpoints.down("xl")} {
                    margin: 0 auto;
                  }
                `)}
              >
                <StaticImage
                  src="../../images/analyzed-object-zoomed-1.png"
                  alt={content.img1Alt}
                  placeholder="blurred"
                  className="fr-mr-1v"
                  height={490}
                  css={css`
                    mix-blend-mode: luminosity;
                  `}
                />
                <p className="fr-text--xs">
                  © Christophe Hargoues. C2RMF. AGLAÉ. CNRS Photothèque. 2017
                </p>
              </div>
              <div
                className="fr-col-lg-6"
                css={css`
                  ${fr.breakpoints.down("xl")} {
                    display: none;
                  }
                `}
              >
                <StaticImage
                  src="../../images/analyzed-object-zoomed-2.png"
                  alt={content.img2Alt}
                  placeholder="blurred"
                  className="fr-ml-1v"
                  height={490}
                  css={css`
                    mix-blend-mode: luminosity;
                    transform: scaleX(-1);
                  `}
                />
                <p className="fr-text--xs">© Vanessa Fournier. C2RMF.</p>
              </div>
            </FadeInDiv>
          )}
        </div>
      </BaseSection>
    </div>
  );
};
