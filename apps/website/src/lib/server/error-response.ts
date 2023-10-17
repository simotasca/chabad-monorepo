export async function errorResponse(url: URL) {
  const error = await fetch(new URL("/404", url));
  return new Response(error.body, {
    headers: error.headers,
    status: 404,
    statusText: "Not Found",
  });
}

export async function articleNotFoundResponse(url: URL) {
  // TODO: maybe a custom page
  const error = await fetch(new URL("/404", url));
  return new Response(error.body, {
    headers: error.headers,
    status: 404,
    statusText: "Not Found",
  });
}
