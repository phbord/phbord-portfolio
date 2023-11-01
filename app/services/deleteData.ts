import type { SupabaseClient } from "@supabase/supabase-js";

import { getSupabase } from "~/services/api";

export interface deleteDataInterface {
  table: string,
  match: Record<string, any> | null,
  join?: Record<string, any> | null
}

export default async function deleteData({ table, match=null, join=null }: deleteDataInterface) {
  try {
    const supabase: SupabaseClient<any, "public", any> | undefined = await getSupabase();

    // Vérifie que les conditions de suppression ont été spécifiées
    if (!match || Object.keys(match).length === 0) {
      throw new Error("La clause 'match' doit être spécifiée pour supprimer des données.");
    }

    let query = supabase
      .from(table)
      .delete()
      .match(match);

    // Ajoute une jointure à la requête si nécessaire
    if (join !== null) {
      query = query.join(join.table, join.on)
    }

    const { data, error, status } = await query

    if (error && status !== 406) {
      throw error
    }
    
    return true
  }
  catch (error) {
    console.log(error.message)
    return null
  }
}
