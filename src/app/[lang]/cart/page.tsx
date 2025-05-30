import CartDataRequest from "@/cart/CartDataRequest";
import CartTable from "@/cart/CartTable";
import CCByLink from "@/components/CCByLink";
import CCByLogos from "@/components/CCByLogos";
import { StartDsfrOnHydration } from "@/dsfr-bootstrap";

import { getTranslations } from "../dictionaries";
import { IPageParam } from "../types";
import styles from "./page.module.css";

export { generateStaticParams } from "../static-params";

export interface ICartContent {
  title: string;
  requestData: string;
  buttonSubmit: string;
  error: string;
  errorOnRequest: string;
  errorOnRunTitle: string;
  successTitle: string;
  successDescription: string;
  successLink: string;
  dataLicensedUnder: string;
}

export default async function CartPage({
  params,
}: {
  params: Promise<IPageParam>;
}) {
  const { lang } = await params;

  const translations = getTranslations(lang);

  const content = translations.cart;

  return (
    <div className={`fr-container fr-my-3w ${styles.root}`}>
      <StartDsfrOnHydration />
      <h1>{content.title}</h1>
      <div className="fr-grid-row">
        <CartTable />
      </div>

      <div className="fr-grid-row">
        <CartDataRequest />
      </div>
      <div className="fr-grid-row fr-mt-1w">
        <small>
          {content.dataLicensedUnder} <CCByLink lang={lang} />
          <CCByLogos />
        </small>
      </div>
    </div>
  );
}
