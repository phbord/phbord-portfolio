import type { SupabaseClient } from "@supabase/supabase-js";

import { getSupabase } from "~/services/api";

export interface updateDataInterface {
  table: string,
  values: object,
  match?: Record<string, any> | null
}

export default async function updateData({ table, values, match=null }: updateDataInterface) {
  try {
    const supabase: SupabaseClient<any, "public", any> | undefined = await getSupabase();
    let query = supabase
      .from(table)
      .update(values);

    if (match !== null) {
      query = query.match(match);
    }

    const { data, error, status } = await query;

    if (error && status !== 406) {
      throw error;
    }

    //console.log('insert ----> status:', status);
    return status;
  }
  catch (error) {
    //console.log(error.message);
    return null;
  }
}