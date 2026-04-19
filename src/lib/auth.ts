import { createClient } from "@/lib/supabase/client";

const supabase = createClient();

export type AuthProps = {
  email: string;
  password: string;
  captchaToken?: string;
};

/* ------------------ AUTH USERS ------------------ */

export async function signUp({ email, password, captchaToken }: AuthProps) {
  try {
    const payload = captchaToken
      ? {
          email,
          password,
          options: {
            captchaToken,
          },
        }
      : { email, password };

    return supabase.auth.signUp(payload);
  } catch (e) {
    console.log("Error signing up: ", e);
  }
}

export async function signIn({ email, password }: AuthProps) {
  try {
    return supabase.auth.signInWithPassword({
      email,
      password,
    });
  } catch (e) {
    console.log("Error signing in: ", e);
  }
}

export async function signOut() {
  try {
    return supabase.auth.signOut();
  } catch (e) {
    console.log("Error signing out: ", e);
  }
}

/* ------------------ GUEST PLAYER ------------------ */
/**
 * IMPORTANT:
 * This does NOT use Supabase Auth.
 * It creates a player row directly.
 */
export async function createGuestPlayer() {
  const randomName = `Guest${Math.floor(Math.random() * 9999)}`;

  const { data, error } = await supabase
    .from("players")
    .insert({
      name: randomName,
      is_guest: true,
      user_id: null,
    })
    .select()
    .single();

  if (error) throw error;

  localStorage.setItem("playerId", data.id);

  return data;
}

// export async function updateUser({ email, password }: AuthProps) {
//   supabase.auth.updateUser({
//     email,
//     password,
//   });
// }
