import { ActionFunctionArgs, json } from "@remix-run/node";

import deleteData from "~/services/deleteData";


export async function action({ request }: ActionFunctionArgs) {
  const data = await request.formData();
  const table = data.get('table');
  const id = data.get('id');

  // Suppression
  const res = await deleteData({ table, match: { id } });

  if (res) {
    return json({
      isValid: true,
      isDisplayedSnackBar: true,
      message: 'deleteDataText'
    });
  }

  return json({
    isValid: false,
    isDisplayedSnackBar: true,
    message: 'deleteDataErrorText'
  });
}