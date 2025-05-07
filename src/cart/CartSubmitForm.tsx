import Input from "@codegouvfr/react-dsfr/Input";
import { useContext } from "react";

import { LangContext } from "../contexts/LangContext";

import { DetailValidationError } from "./client";
import { IDataRequestForm } from "./IDataRequestForm";

function getInputErrorProps(
  errors: DetailValidationError,
  key: keyof DetailValidationError,
) {
  return {
    state: errors[key] ? "error" : (undefined as "error" | undefined),
    stateRelatedMessage: errors[key]?.join("\n"),
  };
}

export interface CartSubmitFormContent {
  email: string;
  firstName: string;
  lastName: string;
  description: string;
  descriptionHint: string;
  institution: string;
}

interface CartSubmitFormProps {
  form: IDataRequestForm;
  onFormChange: (form: IDataRequestForm) => void;
  errors: DetailValidationError;
}

export default function CartSubmitForm({
  form,
  onFormChange,
  errors,
}: CartSubmitFormProps) {
  const translations = useContext(LangContext).translations.cartSubmitForm;
  return (
    <div>
      <Input
        nativeInputProps={{
          type: "email",
          autoComplete: "on",
          onInput: (e) => {
            onFormChange({ ...form, email: e.currentTarget.value });
          },
          value: form.email,
          required: true,
        }}
        label={translations.email}
        {...getInputErrorProps(errors, "user_email")}
      />
      <Input
        nativeInputProps={{
          type: "text",
          autoComplete: "given-name",
          onInput: (e) => {
            onFormChange({ ...form, firstName: e.currentTarget.value });
          },
          value: form.firstName,
          required: true,
        }}
        label={translations.firstName}
        {...getInputErrorProps(errors, "user_first_name")}
      />
      <Input
        nativeInputProps={{
          type: "text",
          autoComplete: "family-name",
          onInput: (e) => {
            onFormChange({ ...form, lastName: e.currentTarget.value });
          },
          value: form.lastName,
          required: true,
        }}
        label={translations.lastName}
        {...getInputErrorProps(errors, "user_last_name")}
      />
      <Input
        nativeInputProps={{
          type: "text",
          autoComplete: "organization",
          onInput: (e) => {
            onFormChange({ ...form, institution: e.currentTarget.value });
          },
          value: form.institution,
          required: true,
        }}
        label={translations.institution}
        {...getInputErrorProps(errors, "user_institution")}
      />
      <Input
        textArea
        nativeTextAreaProps={{
          onInput: (e) => {
            onFormChange({ ...form, description: e.currentTarget.value });
          },
          value: form.description,
          required: true,
        }}
        label={translations.description}
        hintText={translations.descriptionHint}
        {...getInputErrorProps(errors, "description")}
      />
    </div>
  );
}
