import { supabase } from "./supabaseClient";

export type AuthProps = {
  email: string;
  password: string;
};

export async function signUp({ email, password }: AuthProps) {
  return supabase.auth.signUp({
    email,
    password,
  });
}

export async function signIn({ email, password }: AuthProps) {
  return supabase.auth.signInWithPassword({
    email,
    password,
  });
}

export async function signOut() {
  return supabase.auth.signOut();
}
