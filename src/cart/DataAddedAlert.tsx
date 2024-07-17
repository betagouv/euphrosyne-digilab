import { fr } from "@codegouvfr/react-dsfr";
import Alert from "@codegouvfr/react-dsfr/Alert";
import { css } from "@emotion/react";
import { useContext } from "react";

import { LangContext } from "../contexts/LangContext";

const alertStyle = css({
  "&&": {
    position: "fixed",
    bottom: "14px",
    right: "14px",
    zIndex: 1000,
    backgroundColor: fr.colors.decisions.background.default.grey.default,
  },
});

export interface DataAddedAlertContent {
  description: string;
}

export default function DataAddedAlert() {
  const translations = useContext(LangContext).translations.dataAlert;
  return (
    <Alert
      css={alertStyle}
      closable
      title={translations.description}
      severity="success"
    />
  );
}
