import { useRef } from "react";
import { css } from "@emotion/react";
import { fr } from "@codegouvfr/react-dsfr";

import { BaseSection } from "../BaseSection";
import AnimatedNumber from "../AnimatedNumber";
import useHasBeenInViewport from "../../hooks/useHasBeenInViewport";

export const FigureSection = () => {
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
        <div>
          <h3>Les chiffres clefs de NewAglae</h3>
        </div>
        <div className="fr-grid-row fr-grid-row--gutters">
          <div className="fr-col-12 fr-col-lg-4 fr-p-7w">
            <h4>{isInViewport && <AnimatedNumber n={230} />}</h4>
            <p>projets menés en 2022</p>
          </div>
          <div className="fr-col-12 fr-col-lg-4 fr-p-7w">
            <h4>{isInViewport && <AnimatedNumber n={4000} />}</h4>
            <p>objets analysés en 2022</p>
          </div>
          <div className="fr-col-12 fr-col-lg-4 fr-p-7w">
            <h4>{isInViewport && <AnimatedNumber n={32} />}</h4>
            <p>projets Euphrosyne</p>
          </div>
        </div>
      </BaseSection>
    </div>
  );
};
