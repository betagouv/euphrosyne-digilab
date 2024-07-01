import { fr } from "@codegouvfr/react-dsfr";
import SearchBar from "@codegouvfr/react-dsfr/SearchBar";
import { css } from "@emotion/react";
import { navigate } from "gatsby";

import { ContentProps, getCurrentLangKey, localizePath } from "../../i18n";

export interface SearchSectionContent {
  title: {
    highlight: string;
    rest: string;
  };
}

const highlightStyle = css`
  font-family: Spectral;
  font-style: italic;
  color: ${fr.colors.decisions.text.actionHigh.blueFrance.default};
`;

export const SearchSection: React.FC<ContentProps<SearchSectionContent>> = ({
  content,
}) => {
  return (
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
            <span css={highlightStyle}>{content.title.highlight}</span>{" "}
            {content.title.rest}
          </h2>
        </div>
        <div className="fr-mt-5w fr-px-3w">
          <SearchBar
            big={true}
            onButtonClick={(text) =>
              navigate(localizePath(`/catalog?q=${text}`, getCurrentLangKey()))
            }
          />
        </div>
      </div>
    </div>
  );
};
