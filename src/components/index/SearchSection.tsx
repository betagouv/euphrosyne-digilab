import { css } from "@emotion/react";
import { fr } from "@codegouvfr/react-dsfr";
import SearchBar from "@codegouvfr/react-dsfr/SearchBar";
import { navigate } from "gatsby";

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
        <SearchBar
          big={true}
          label="Rechercher un mot, une expression, une référence..."
          onButtonClick={(value) => {
            navigate(`/catalog?q=${value}`);
          }}
          className="fr-mx-3w"
        />
      </div>
    </div>
  </div>
);
