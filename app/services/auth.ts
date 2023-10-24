import type { SupabaseClient } from "@supabase/supabase-js";

import { getSupabase } from "~/services/api";


// Inscription
export async function signUp(email: string, password: string) {
  try {
    const supabase: SupabaseClient<any, "public", any> | undefined = await getSupabase();
    const { data, user, session, error, status } = await supabase.auth.signUp({
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
    const { data, session, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      throw error;
    }
    console.log(session, '==========> Connexion : ', data);
    return data;
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
    const { error, data, status } = await supabase.auth.signOut();

    if (error) {
      throw error;
    }
    console.log(status, '==========> Déconnexion : ', data);
    return true;
  }
  catch (error) {
    console.log(error.message);
    return null;
  }
}

// Récupération de la session
export async function getSession() {
  try {
    const supabase = await getSupabase();
    const { error, data: { session } } = await supabase.auth.getSession();
    console.log('==========> Récupération de la session : ', session);

    if (error) {
      throw error;
    }
    else if (!error) {
      return session;
    }
  }
  catch (error) {
    console.log(error.message)
    return null;
  }
}