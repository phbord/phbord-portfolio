import type { SupabaseClient } from "@supabase/supabase-js";

import { getSupabase } from "~/services/api";


// Inscription
export async function signUp(email: string, password: string) {
  try {
    const supabase: SupabaseClient<any, "public", any> | undefined = await getSupabase();
    const { error, data } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      throw error;
    }
    return true;
  }
  catch (error) {
    console.log(error.message);
    return null;
  }
}

// Connexion
export async function signIn(email: string, password: string) {
  try {
    const supabase: SupabaseClient<any, "public", any> | undefined = await getSupabase();
    const { error, data } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      throw error;
    }
    return true;
  }
  catch (error) {
    console.log(error.message);
    return null;
  }
}

// Déconnexion
export async function signOut() {
  try {
    const supabase: SupabaseClient<any, "public", any> | undefined = await getSupabase();
    const { error, data } = await supabase.auth.signOut();

    if (error) {
      throw error;
    }
    return true;
  }
  catch (error) {
    console.log(error.message);
    return null;
  }
}