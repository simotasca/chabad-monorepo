import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

dotenv.config();

const { SUPABASE_HOST, SUPABASE_SERVICE_ROLE_KEY } = process.env;

if (!SUPABASE_SERVICE_ROLE_KEY) {
  throw new Error(
    "Missing required environment variable SUPABASE_SERVICE_ROLE_KEY"
  );
}

if (!SUPABASE_HOST) {
  throw new Error("Missing required environment variable SUPABASE_HOST");
}

const supabase = createClient(SUPABASE_HOST, SUPABASE_SERVICE_ROLE_KEY);

export default supabase;
