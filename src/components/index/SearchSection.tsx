import { fr } from "@codegouvfr/react-dsfr";
import { css } from "@emotion/react";

const highlightStyle = css`
  font-family: Spectral;
  font-style: italic;
  color: ${fr.colors.decisions.text.actionHigh.blueFrance.default};
`;

export const SearchSection = () => (
  <div
    css={css`
      background-color: ${fr.colors.decisions.background.alt.grey.default};
    `}
    className="fr-pt-10w"
  >
    <div
      css={css`
        background-color: ${fr.colors.decisions.background.default.grey
          .default};
        max-width: 996px;
        margin: 0 auto;
        text-align: center;
      `}
      className="fr-pb-10w fr-pt-5w"
    >
      <div>
        <h2>
          <span css={highlightStyle}>Parcourez</span> notre catalogue de données
          Euphrosyne
        </h2>
      </div>
      <div className="fr-mt-5w">
        <p css={highlightStyle}>Fonctionnalité à venir...</p>
      </div>
    </div>
  </div>
);
