import { NextResponse } from "next/server";
import { lookupArticle, validArticleSlug } from "@/lib/article-core.mjs";

// A missing post must be identified before React begins streaming the response.
export async function proxy(request) {
  let slug;
  try { slug = decodeURIComponent(request.nextUrl.pathname.slice(1).replace(/\/$/, "")); }
  catch { return NextResponse.next(); }
  if (!validArticleSlug(slug) || ["favicon.ico", "robots.txt", "sitemap.xml", "manifest.webmanifest"].includes(slug)) return NextResponse.next();
  const result = await lookupArticle(slug);
  if (result.kind === "found") return NextResponse.next();
  if (result.kind === "unavailable") return new NextResponse("<!doctype html><html lang=\"en\"><head><meta name=\"viewport\" content=\"width=device-width, initial-scale=1\"><meta name=\"robots\" content=\"noindex\"><title>Article temporarily unavailable</title></head><body><main><h1>Article temporarily unavailable</h1><p>Please try again shortly.</p><a href=\"\">Try again</a></main></body></html>", { status: 503, headers: { "content-type": "text/html; charset=utf-8", "retry-after": "60", "cache-control": "no-store" } });
  return new NextResponse("<!doctype html><html lang=\"en\"><head><meta name=\"viewport\" content=\"width=device-width, initial-scale=1\"><meta name=\"robots\" content=\"noindex\"><title>Page not found</title></head><body><main><h1>Page not found</h1><p>The page you requested could not be found.</p><a href=\"/\">Return home</a></main></body></html>", { status: 404, headers: { "content-type": "text/html; charset=utf-8", "cache-control": "no-store" } });
}

export const config = { matcher: ["/:slug"] };
