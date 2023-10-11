export async function getErrorResponse(url: URL) {
  const error = await fetch(new URL("/404", url));
  return new Response(error.body, {
    headers: error.headers,
    status: 404,
    statusText: "Not Found",
  });
}