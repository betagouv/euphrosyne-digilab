import { fr } from "@codegouvfr/react-dsfr";
import { Button } from "@codegouvfr/react-dsfr/Button";
import { createModal } from "@codegouvfr/react-dsfr/Modal";
import { css } from "@emotion/react";
import { HeadFC, PageProps } from "gatsby";
import { FormEvent, useContext, useRef, useState } from "react";

import CartSubmitForm from "../cart/CartSubmitForm";
import CartTable from "../cart/CartTable";
import { IDataRequestForm } from "../cart/IDataRequestForm";
import {
  DetailValidationError,
  ValidationError,
  requestData,
} from "../cart/client";
import { CartContext } from "../cart/context";
import { BaseHead } from "../components/BaseHead";
import { I18nLink as Link } from "../components/I18nLink";
import { LangContext } from "../contexts/LangContext";

const modal = createModal({
  id: "cart-modal",
  isOpenedByDefault: false,
});

export interface CartContent {
  title: string;
  requestData: string;
  buttonSubmit: string;
  error: string;
  errorOnRequest: string;
  errorOnRunTitle: string;
  successTitle: string;
  successDescription: string;
  successLink: string;
}

export interface CartProps extends PageProps {}

function ErrorAlert({ title, body }: { title: string; body?: string }) {
  return (
    <div className="fr-alert fr-alert--error fr-my-1w">
      <h3 className="fr-alert__title">{title}</h3>
      {body && <p>{body}</p>}
    </div>
  );
}

export default function CartPage() {
  const translations = useContext(LangContext).translations.cart;

  const [errors, setErrors] = useState<DetailValidationError>({});
  const [showSuccess, setShowSuccess] = useState(false);

  const formRef = useRef<HTMLFormElement>(null);
  const [form, setForm] = useState<IDataRequestForm>({
    email: "",
    firstName: "",
    lastName: "",
    description: "",
    institution: "",
  });
  const isFormValid =
    form && Object.entries(form).every(([, value]) => value && value !== "");

  const { items, emptyCart } = useContext(CartContext);

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (!formRef.current?.reportValidity()) return;
    if (!form) return;
    setErrors({});
    try {
      await requestData(
        form,
        items.map((item) => item.id),
      );
    } catch (e) {
      console.log(e, e instanceof ValidationError);
      if (e instanceof ValidationError) {
        setErrors(e.detail);
        return;
      } else {
        console.error(e);
        setErrors({ ...errors, global: [translations.errorOnRequest] });
      }
      return;
    }
    setShowSuccess(true);
    emptyCart();
  };

  return (
    <div
      className="fr-container fr-my-3w"
      css={css`
        ${fr.breakpoints.down("md")} {
          background-color: ${fr.colors.decisions.background.alt.grey.default};
        }
      `}
    >
      <h1>{translations.title}</h1>
      <div className="fr-grid-row fr-grid-row--gutters">
        <CartTable />
      </div>
      <div className="fr-grid-row fr-grid-row--gutters">
        <Button
          nativeButtonProps={modal.buttonProps}
          disabled={!(items && items.length > 0)}
        >
          {translations.requestData}
        </Button>
        <form onSubmit={onSubmit} ref={formRef}>
          <modal.Component
            title={translations.requestData}
            buttons={[
              {
                doClosesModal: false,
                children: translations.buttonSubmit,
                onClick: onSubmit,
                nativeButtonProps: {
                  disabled: !isFormValid,
                },
              },
            ]}
          >
            {errors.runs?.map((error) => (
              <ErrorAlert title={translations.errorOnRunTitle} body={error} />
            ))}
            {errors.global?.map((error) => (
              <ErrorAlert title={translations.error} body={error} />
            ))}
            {showSuccess && (
              <div className="fr-alert fr-alert--success fr-my-1w">
                <h3 className="fr-alert__title">{translations.successTitle}</h3>
                <p>
                  {translations.successDescription}
                  <br />
                  <Link to="/catalog">{translations.successLink}</Link>
                </p>
              </div>
            )}

            <CartSubmitForm
              form={form}
              onFormChange={setForm}
              errors={errors}
            />
          </modal.Component>
        </form>
      </div>
    </div>
  );
}

export const Head: HeadFC = BaseHead;
