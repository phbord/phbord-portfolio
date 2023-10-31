import type { SupabaseClient } from "@supabase/supabase-js";

import { getSupabase } from "~/services/api";

export interface postDataInterface {
  table: string,
  values: object,
  match?: Record<string, any> | null,
  join?: Record<string, any> | null
}

export default async function postData({ table, values, match=null, join=null }: postDataInterface) {
  try {
    const supabase: SupabaseClient<any, "public", any> | undefined = await getSupabase();
    let query = supabase
      .from(table)
      .insert(values);

    if (match) {
      query = query.match(match)
    }

    // Ajoute une jointure à la requête si nécessaire
    if (join !== null) {
      query = query.join(join.table, join.on)
    }

    const { data, error, status } = await query
    console.error('===========> data:', data);

    if (error && status !== 406) {
      console.error('===========> INSERT error');
      throw error
    }

    return data
  }
  catch (error) {
    console.log(error.message)
    return null
  }
}