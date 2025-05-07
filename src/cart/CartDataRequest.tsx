"use client";

import Button from "@codegouvfr/react-dsfr/Button";
import { createModal } from "@codegouvfr/react-dsfr/Modal";
import Link from "next/link";
import React, { useCallback, useContext, useRef, useState } from "react";

import { LangContext } from "@/contexts/LangContext";

import CartSubmitForm from "./CartSubmitForm";
import { DetailValidationError, requestData, ValidationError } from "./client";
import { CartContext } from "./context";
import ErrorAlert from "./ErrorAlert";
import { IDataRequestForm } from "./IDataRequestForm";

const modal = createModal({
  id: "cart-modal",
  isOpenedByDefault: false,
});

export default function CartDataRequest() {
  const { translations } = useContext(LangContext);
  const content = translations.cart;

  const { items, emptyCart } = useContext(CartContext);

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

  const onSubmit = useCallback(
    async (event: React.FormEvent) => {
      event.preventDefault();
      if (!formRef.current?.reportValidity()) return;
      if (!form) return;
      setErrors({});
      try {
        await requestData(
          form,
          items.map((item) => item.id)
        );
      } catch (e) {
        if (e instanceof ValidationError) {
          setErrors(e.detail);
          return;
        } else {
          console.error(e);
          setErrors({ ...errors, global: [content.errorOnRequest] });
        }
        return;
      }
      setShowSuccess(true);
      emptyCart();
    },
    [form, emptyCart, items, errors, content.errorOnRequest]
  );

  return (
    <React.Fragment>
      <Button
        nativeButtonProps={modal.buttonProps}
        disabled={!(items && items.length > 0)}
      >
        {content.requestData}
      </Button>
      <form onSubmit={onSubmit} ref={formRef}>
        <modal.Component
          title={content.requestData}
          buttons={[
            {
              doClosesModal: false,
              children: content.buttonSubmit,
              onClick: onSubmit,
              nativeButtonProps: {
                disabled: !isFormValid,
              },
            },
          ]}
        >
          {errors.runs?.map((error) => (
            <ErrorAlert
              title={content.errorOnRunTitle}
              body={error}
              key={`error-run-${error}`}
            />
          ))}
          {errors.global?.map((error) => (
            <ErrorAlert
              title={content.error}
              body={error}
              key={`error-global-${error}`}
            />
          ))}
          {showSuccess && (
            <div className="fr-alert fr-alert--success fr-my-1w">
              <h3 className="fr-alert__title">{content.successTitle}</h3>
              <p>
                {content.successDescription}
                <br />
                <Link href="/catalog">{content.successLink}</Link>
              </p>
            </div>
          )}

          <CartSubmitForm form={form} onFormChange={setForm} errors={errors} />
        </modal.Component>
      </form>
    </React.Fragment>
  );
}
