import test from "node:test";
import assert from "node:assert/strict";
import { articleMetadata, lookupArticle, normalizeArticle, sanitizeArticle, validArticleSlug } from "../src/lib/article-core.mjs";

const post = { id: 1, slug: "example-post", status: "publish", title: { rendered: "Example &amp; news" }, content: { rendered: "<p>Article</p>" }, date: "2026-01-01T10:00:00", modified: "2026-01-02T10:00:00", comment_status: "open" };
const mock = body => async () => ({ ok: true, json: async () => body });

test("exact published slug resolution and normalized data", async () => {
  const result = await lookupArticle("example-post", mock([post]));
  assert.equal(result.kind, "found");
  assert.equal(result.post.title, "Example & news");
  assert.equal(result.post.publicPath, "/example-post/");
  assert.equal(result.post.featuredImage, null);
  assert.equal(result.post.commentStatus, "open");
  assert.equal((await lookupArticle("other", mock([post]))).kind, "not-found");
  assert.equal((await lookupArticle("example-post", mock([{ ...post, status: "draft" }]))).kind, "not-found");
});

test("missing, invalid and unavailable responses remain distinct", async () => {
  assert.equal((await lookupArticle("missing", mock([]))).kind, "not-found");
  assert.equal((await lookupArticle("example-post", mock({}))).kind, "unavailable");
  assert.equal((await lookupArticle("example-post", mock([{}]))).kind, "unavailable");
  assert.equal((await lookupArticle("example-post", mock([{ ...post, content: {} }]))).kind, "unavailable");
  assert.equal((await lookupArticle("example-post", async () => { throw new Error("timeout"); })).kind, "unavailable");
  assert.equal((await lookupArticle("example-post", async () => ({ ok: false }))).kind, "unavailable");
});

test("reserved routes and path separators do not reach WordPress", async () => {
  for (const slug of ["home-page", "services", "wp-admin", "api", "../post", "a/b", ""]) {
    assert.equal(validArticleSlug(slug), false);
    assert.equal((await lookupArticle(slug, () => { throw new Error("unexpected request"); })).kind, "not-found");
  }
});

test("sanitization removes scripts, event handlers, unsafe URLs and admin links", () => {
  const result = sanitizeArticle('<div class="elementor"><h2>Title</h2><script>alert(1)</script><p onclick="evil()">Hello <a href="javascript:alert(1)">bad</a> <a href="https://cms.example.com/wp-admin/post.php?post=1">edit</a> <a href="/contact-us/">contact</a></p><img src="https://jobshubhr.com/a.jpg" onerror="evil()" alt="Example"><img src="data:image/svg+xml,x"><iframe src="https://example.com"></iframe></div>');
  assert.match(result, /<h2>Title<\/h2>/);
  assert.match(result, /href="\/contact-us\/"/);
  assert.match(result, /src="https:\/\/jobshubhr.com\/a.jpg"/);
  assert.doesNotMatch(result, /<script|onclick|onerror|javascript:|wp-admin|data:image|<iframe/i);
});

test("metadata and image fallbacks use the public origin", () => {
  const article = normalizeArticle(post);
  const metadata = articleMetadata(article);
  assert.equal(metadata.title, "Example & news");
  assert.equal(metadata.alternates.canonical, "https://jobshubhr.com/example-post/");
  assert.equal(metadata.robots.index, true);
  assert.equal(normalizeArticle({ ...post, _embedded: { "wp:featuredmedia": [{ source_url: "javascript:alert(1)" }] } }).featuredImage, null);
  const seo = articleMetadata({ ...article, seo: { title: "News &amp; updates", robots: { index: "noindex", follow: "nofollow", "max-image-preview": "max-image-preview:large", "max-snippet": "max-snippet:-1" } } });
  assert.equal(seo.title, "News & updates");
  assert.equal(seo.robots.index, false);
  assert.equal(seo.robots.follow, false);
  assert.equal(seo.robots["max-image-preview"], "large");
  assert.equal(seo.robots["max-snippet"], -1);
});
