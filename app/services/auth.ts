import type { SupabaseClient } from "@supabase/supabase-js";

import { getSupabase } from "~/services/api";


export async function signUp(email: string, password: string) {
  try {
    const supabase: SupabaseClient<any, "public", any> | undefined = await getSupabase();
    const { data, user, session, error, status } = await supabase.auth.signUp({
      email,
      password,
    });
  }
  catch (error) {
    
  }
}

export async function signIn(email: string, password: string) {}