import { getShabbesTimes } from "src/lib/shared/calendar";
import type { APIRoute } from "astro";

export const POST: APIRoute = async ({ request }) => {
  if (request.headers.get("Content-Type") === "application/json") {
    const body = await request.json();
    const { city } = body;
    try {
      const times = getShabbesTimes(city);
      return new Response(JSON.stringify(times), {
        status: 200,
      });
    } catch {}
  }
  return new Response(null, { status: 400 });
};
