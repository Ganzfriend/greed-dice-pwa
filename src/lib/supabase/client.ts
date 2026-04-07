import { createBrowserClient } from "@supabase/ssr";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY!;

if (!url || !key) {
  throw new Error("Missing Supabase environment variables");
}

export function createClient() {
  return createBrowserClient(url, key);
}
