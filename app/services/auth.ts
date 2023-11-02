import type { SupabaseClient } from "@supabase/supabase-js";
import moment from 'moment';

import { getSupabase } from "~/services/api";
import postData from "~/services/postData";


// INSCRIPTION
export async function signUp(email: string, password: string, first_name: string, last_name: string): Promise<boolean | null> {
  try {
    const supabase: SupabaseClient<any, "public", any> | undefined = await getSupabase();
    const { data, user, session, error, status } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      throw error;
    }
    else {
      // Insertion de données complémentaires dans la table "Profile"
      const user_id = data.user.id;
      const values: object = {
        user_id: data.user.id,
        first_name,
        last_name,
        account_created: moment(Date.now()).format('MM/DD/YYYY'),
      };
      await postData({ table: 'Profile', values });
      console.log('==========> Inscription');
    }
    return true;
  }
  catch (error) {
    console.log(error.message);
    return null;
  }
}

// CONNEXION
export async function signIn(email: string, password: string): Promise<object | null> {
  try {
    const supabase: SupabaseClient<any, "public", any> | undefined = await getSupabase();
    const { data, session, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      throw error;
    }
    console.log('==========> Connexion : ', data);
    return data.session;
  }
  catch (error) {
    console.log(error.message);
    return null;
  }
}

// DECONNEXION
export async function signOut(): Promise<boolean | null> {
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

// RECUPERATION DE LA SESSION
export async function getSession(): Promise<any> {
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

// Récupération de l'utilisateur
export async function getUser(): Promise<any> {
  try {
    const supabase = await getSupabase();
    const { error, data: { user } } = await supabase.auth.getUser();
    console.log('==========> Récupération de l\'utilisateur : ', user);

    if (error) {
      throw error;
    }
    else if (!error) {
      return user;
    }
  }
  catch (error) {
    console.log(error.message)
    return null;
  }
}