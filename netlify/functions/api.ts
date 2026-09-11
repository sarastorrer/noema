import handler from "../../dist/server/index.js";

export default async function (req: Request): Promise<Response> {
  const proto = req.headers.get("x-forwarded-proto") || "https";
  const host = req.headers.get("x-forwarded-host") || req.headers.get("host") || "localhost";
  const url = new URL(req.url);
  const newUrl = new URL(url.pathname + url.search, `${proto}://${host}`);
  const newReq = new Request(newUrl, {
    method: req.method,
    headers: req.headers,
    body: req.body,
    redirect: req.redirect,
  });
  return handler(newReq, {});
}
