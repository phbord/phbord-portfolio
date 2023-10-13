import { SupabaseClient, createClient } from "@supabase/supabase-js";

import { SUPABASE_URL, SUPABASE_KEY } from "~/assets/data/constants";


async function initializeSupabase(): Promise<SupabaseClient<any, "public", any> | undefined> {
  try {
    return createClient(
      SUPABASE_URL,
      SUPABASE_KEY
    );
  }
  catch (err) {
    console.error(err);
  }
}
    
export async function getSupabase() {
  return await initializeSupabase();
}