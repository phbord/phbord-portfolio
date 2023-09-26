import { createClient } from "@supabase/supabase-js";

import { REACT_APP_SUPABASE_URL, REACT_APP_SUPABASE_KEY } from "~/assets/data/constants";


async function initializeSupabase() {
  try {
    return createClient(
      REACT_APP_SUPABASE_URL,
      REACT_APP_SUPABASE_KEY
    );
  }
  catch (err) {
    console.error(err);
  }
}
    
export async function getSupabase() {
  return await initializeSupabase();
}