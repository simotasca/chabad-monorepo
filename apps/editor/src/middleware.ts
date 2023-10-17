import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";

import type { NextRequest } from "next/server";
import type { database as db } from "@chabad/types";

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient<db.Database>({ req, res });
  await supabase.auth.signInWithPassword({
    email: "emanuele.hazan@gmail.com",
    password: "blackleaf96"
  });
  await supabase.auth.getSession();
  return res;
}
