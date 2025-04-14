"use client";

import { fr } from "@codegouvfr/react-dsfr";
import SearchBar from "@codegouvfr/react-dsfr/SearchBar";
import { ContentProps, getCurrentLangKey, localizePath } from "@/i18n";
import { useRouter } from "next/navigation";
import { tss } from "tss-react";

export interface SearchSectionContent {
  title: {
    highlight: string;
    rest: string;
  };
}

export const SearchSection: React.FC<ContentProps<SearchSectionContent>> = ({
  content,
}) => {
  const useStyles = tss.create({
    root: {
      backgroundColor: fr.colors.decisions.background.alt.grey.default,
    },
    container: {
      backgroundColor: fr.colors.decisions.background.default.grey.default,
      maxWidth: "996px",
      margin: "0 auto",
      textAlign: "center",
    },
    highlight: {
      fontFamily: "Spectral",
      fontStyle: "italic",
      color: fr.colors.decisions.text.actionHigh.blueFrance.default,
    },
  });
  const { classes } = useStyles();
  const router = useRouter();

  return (
    <div className={`${classes.root} fr-pt-10w`}>
      <div className={`fr-pb-10w fr-pt-5w ${classes.container}`}>
        <div>
          <h2>
            <span className={classes.highlight}>{content.title.highlight}</span>{" "}
            {content.title.rest}
          </h2>
        </div>
        <div className="fr-mt-5w fr-px-3w">
          <SearchBar
            big={true}
            onButtonClick={(text) =>
              router.push(
                localizePath(`/catalog?q=${text}`, getCurrentLangKey())
              )
            }
          />
        </div>
      </div>
    </div>
  );
};
