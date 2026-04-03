import * as auth from "./auth";
import * as utils from "./utils";
import { supabase } from "./supabaseClient";
import { generateJoinCode } from "./joinCode";

export default { ...auth, ...utils, supabase, generateJoinCode };
