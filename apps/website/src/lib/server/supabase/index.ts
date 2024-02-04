import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/db-types";

if (!import.meta.env.SUPABASE_HOST) {
  throw new Error("Missing required env variable SUPABASE_HOST");
}

if (!import.meta.env.PUBLIC_SUPABASE_ANON_KEY) {
  throw new Error("Missing required env variable PUBLIC_SUPABASE_ANON_KEY");
}

// Create a single supabase client for interacting with your database
const supabase = createClient<Database>(
  import.meta.env.SUPABASE_HOST!,
  import.meta.env.PUBLIC_SUPABASE_ANON_KEY!
);

export default supabase;