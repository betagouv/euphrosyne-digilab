import { IDataRequestForm } from "./IDataRequestForm";

interface Form {
  user_email: string;
  user_first_name: string;
  user_last_name: string;
  user_institution: string;
  description: string;
  runs: string[];
}

export type DetailValidationError = {
  [key in keyof Form]?: string[];
} & { global?: string[] };

export class ValidationError extends Error {
  detail: DetailValidationError;

  constructor(detail: DetailValidationError) {
    super("Validation error");
    this.detail = detail;
  }
}

export async function requestData(form: IDataRequestForm, runIds: string[]) {
  const url = `${process.env.NEXT_PUBLIC_EUPHROSYNE_HOST}/api/data-request/`;
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ...formatForm(form),
      runs: runIds,
    }),
  });

  if (!response.ok) {
    throw new ValidationError((await response.json()) as DetailValidationError);
  }
}

function formatForm(form: IDataRequestForm): Omit<Form, "runs"> {
  return {
    user_email: form.email,
    user_first_name: form.firstName,
    user_last_name: form.lastName,
    user_institution: form.institution,
    description: form.description,
  };
}
