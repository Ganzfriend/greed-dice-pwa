import { supabase } from "./supabaseClient";

export type AuthProps = {
  email: string;
  password: string;
  captchaToken: string;
};

export async function signUp({ email, password, captchaToken }: AuthProps) {
  try {
    return await supabase.auth.signUp({
      email,
      password,
      options: { captchaToken },
    });
  } catch (e) {
    console.log("Error signing up: ", e);
  }
}

export async function signIn({ email, password }: AuthProps) {
  try {
    return await supabase.auth.signInWithPassword({
      email,
      password,
    });
  } catch (e) {
    console.log("Error signing in: ", e);
  }
}

export async function signInAnonymously({ captchaToken }: Partial<AuthProps>) {
  try {
    return await supabase.auth.signInAnonymously({ options: { captchaToken } });
  } catch (e) {
    console.log("Error signing in anonymously: ", e);
  }
}

export async function signOut() {
  try {
    return await supabase.auth.signOut();
  } catch (e) {
    console.log("Error signing out: ", e);
  }
}
