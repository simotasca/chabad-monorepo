import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

dotenv.config();

const supabase = createClient(
  process.env.SUPABASE_HOST,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export default supabase;