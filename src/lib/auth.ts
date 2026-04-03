import { supabase } from "./supabaseClient";

export type AuthProps = {
  email: string;
  password: string;
  captchaToken: string;
};

export async function signUp({ email, password, captchaToken }: AuthProps) {
  return supabase.auth.signUp({
    email,
    password,
    options: { captchaToken },
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
