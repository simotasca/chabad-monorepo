export function bucketSrc(path?: string | null) {
  if (!path || path.startsWith("http") || path.startsWith("#")) return path;

  let pathOk = path;

  if (!pathOk.startsWith("/")) pathOk = "/" + pathOk;
  pathOk = "http://localhost:8000" + pathOk;
  
  return pathOk;
}
