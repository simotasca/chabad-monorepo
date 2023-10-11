import { createClient } from "@supabase/supabase-js";
import { database as db } from "@chabad/types";

// Create a single supabase client for interacting with your database
const supabase = createClient<db.Database>(
  import.meta.env.PUBLIC_SUPABASE_HOST,
  import.meta.env.PUBLIC_SUPABASE_ANON_KEY
);

export default supabase;

export type Table<T extends keyof db.Database["public"]["Tables"]> =
  db.Database["public"]["Tables"][T]["Row"];
