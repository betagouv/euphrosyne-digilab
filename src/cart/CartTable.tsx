import { FrIconClassName, fr } from "@codegouvfr/react-dsfr";
import Button from "@codegouvfr/react-dsfr/Button";
import { Table } from "@codegouvfr/react-dsfr/Table";
import { useContext } from "react";

import { I18nLink as Link } from "../components/I18nLink";
import { PageBadges } from "../components/PageBadges";
import { LangContext } from "../contexts/LangContext";
import { CartContext } from "./context";

export interface CartTableContent {
  headerRunName: string;
  headerFromType: string;
  headerFromPage: string;
  headerDelete: string;
  viewFromPage: string;
  noData: string;
}

export default function CartTable() {
  const translations = useContext(LangContext).translations.cartTable;
  const { items, removeItem } = useContext(CartContext);

  const data = items.map((item) => [
    item.label,
    <PageBadges pageType={item.from.type} />,
    <Link to={item.from.href}>{translations.viewFromPage}</Link>,
    <Button
      iconId={fr.cx("fr-icon-close-line") as FrIconClassName}
      onClick={() => removeItem(item)}
      title={translations.headerDelete}
      priority="tertiary no outline"
    />,
  ]);

  return items.length === 0 ? (
    <p>{translations.noData}</p>
  ) : (
    <Table
      data={data}
      headers={[
        translations.headerRunName,
        translations.headerFromType,
        translations.headerFromPage,
        translations.headerDelete,
      ]}
    />
  );
}
