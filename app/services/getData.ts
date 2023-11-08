import type { SupabaseClient } from "@supabase/supabase-js";

import { getSupabase } from "~/services/api";


export interface getDataInterface {
  table: String,
  columns?: String,
  match?: String | null,
  join?: String | null,
  orderBy?: String | null,
  orderByBis?: String | null,
  ascending?: boolean
}

export default async function getData({ table, columns='*', match=null, join=null, orderBy=null, orderByBis=null, ascending=false }: getDataInterface) {
  try {
    const supabase: SupabaseClient<any, "public", any> | undefined = await getSupabase();

    if (supabase) {
      let query = supabase
        .from(table)
        .select(columns)

      if (match !== null) {
        query = query.match(match)
      }
      if (orderBy !== null) {
        query = query.order(orderBy, { ascending })
      }
      if (orderByBis !== null) {
        query = query.order(orderByBis, { ascending })
      }

      let { data, error, status } = await query

      if (error && status !== 406) {
        throw error
      }

      // Ajout d'une jointure à la requête si nécessaire
      if (join !== null) {
        const { data: joinedData, error: joinError, status: joinStatus } = await supabase
          .from(table)
          .select(columns)
          .join(join.table, join.on)

        // Verifie si l'erreur est côté client ou serveur
        if (joinError && joinStatus !== 406) {
          throw joinError
        }

        return joinedData
      }
      
      return data
    }
  }
  catch (error: any) {
    console.log(error.message)
    return null
  }
}