import { ActionFunctionArgs, json } from "@remix-run/node";

import deleteData from "~/services/deleteData";


export async function action({ request }: ActionFunctionArgs) {
  const data = await request.formData();
  const table = data.get('table');
  const id = data.get('id');

  // Suppression
  deleteData({ table, match: { id } });

  return json({
    isReloadData: true
  });
}