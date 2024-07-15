import { IDataRequestForm } from "./IDataRequestForm";

export async function requestData(form: IDataRequestForm, runIds: string[]) {
  const url = `${process.env.GATSBY_EUPHROSYNE_HOST}/api/data-request/`;
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
    throw new Error(`Failed to request data: ${response.statusText}`);
  }
}

function formatForm(form: IDataRequestForm) {
  return {
    user_email: form.email,
    user_first_name: form.firstName,
    user_last_name: form.lastName,
    user_institution: form.institution,
    description: form.description,
  };
}
