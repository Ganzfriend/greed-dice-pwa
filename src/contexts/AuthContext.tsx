import { createContext } from "react";
import { User } from "@supabase/supabase-js";

const AuthContext = createContext<{ user: User | null }>({ user: null });

export default AuthContext;
