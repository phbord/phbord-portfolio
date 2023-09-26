import { getSupabase } from "~/services/api";

export async function getData({ table, columns='*', match=null, join=null, orderBy=null, ascending=false }) {
  try {
    const supabase = await getSupabase();

    let query = supabase
      .from(table)
      .select(columns)

    if (match !== null) {
      query = query.match(match)
    }
    if (orderBy !== null) {
      query = query.order(orderBy, { ascending: ascending })
    }

    let { data, error, status } = await query

    if (error && status !== 406) {
      throw error
    }

    // Ajoute une jointure à la requête si nécessaire
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
  catch (error) {
    console.log(error.message)
    return null
  }
}