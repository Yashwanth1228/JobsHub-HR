import sanitizeHtml from "sanitize-html";
import { wordpressTitle } from "./wordpress.js";

const PUBLIC_ORIGIN = "https://jobshubhr.com";
const RESERVED = new Set(["home-page", "about-us", "services", "contact-us", "top-recruitment-agency-in-bangalore", "api", "category", "tag", "wp-admin", "wp-content", "wp-json", "_next"]);

export function validArticleSlug(slug) {
  return typeof slug === "string" && slug.length > 0 && slug.length <= 200 && !/[\\/\u0000-\u001f?#]/.test(slug) && !RESERVED.has(slug.toLowerCase());
}

function decodedSlug(slug) {
  try { return decodeURIComponent(slug); } catch { return slug; }
}

function allowedUrl(value, image = false) {
  if (typeof value !== "string" || /[\u0000-\u0020\u007f\\]/.test(value) || value.startsWith("//")) return null;
  try {
    const url = new URL(value, PUBLIC_ORIGIN);
    if (image ? url.protocol !== "https:" : !["https:", "http:", "mailto:", "tel:"].includes(url.protocol)) return null;
    if (/^\/(?:wp-admin|wp-login\.php)(?:\/|$)/i.test(decodeURIComponent(url.pathname))) return null;
    return value;
  } catch { return null; }
}

export function sanitizeArticle(html) {
  return sanitizeHtml(typeof html === "string" ? html : "", {
    allowedTags: ["div", "section", "article", "p", "br", "hr", "h2", "h3", "h4", "h5", "h6", "strong", "b", "em", "i", "u", "s", "blockquote", "ul", "ol", "li", "a", "img", "figure", "figcaption", "table", "thead", "tbody", "tfoot", "tr", "th", "td", "span", "pre", "code"],
    allowedAttributes: { a: ["href", "title"], img: ["src", "alt", "width", "height"], th: ["colspan", "rowspan"], td: ["colspan", "rowspan"] },
    allowedSchemes: ["http", "https", "mailto", "tel"],
    allowProtocolRelative: false,
    transformTags: {
      a: (tagName, attrs) => allowedUrl(attrs.href) ? { tagName, attribs: { href: attrs.href, ...(attrs.title ? { title: attrs.title } : {}) } } : { tagName: "span", attribs: {} },
      img: (tagName, attrs) => allowedUrl(attrs.src, true) ? { tagName, attribs: { src: attrs.src, alt: attrs.alt || "", ...(attrs.width ? { width: attrs.width } : {}), ...(attrs.height ? { height: attrs.height } : {}) } } : { tagName: "span", attribs: {} },
    },
    nonTextTags: ["script", "style", "textarea", "noscript", "iframe", "object", "embed", "form"],
  });
}

export function normalizeArticle(post) {
  const media = post._embedded?.["wp:featuredmedia"]?.[0];
  const source = media?.source_url;
  return {
    id: post.id, slug: post.slug, publicPath: `/${post.slug}/`, title: wordpressTitle(post.title.rendered),
    publishedAt: post.date, modifiedAt: post.modified, content: sanitizeArticle(post.content.rendered), commentStatus: post.comment_status || "unknown", seo: post.yoast_head_json || {},
    featuredImage: source && allowedUrl(source, true) ? { url: source, alt: media.alt_text || "", width: Number.isInteger(media.media_details?.width) && media.media_details.width > 0 ? media.media_details.width : 1200, height: Number.isInteger(media.media_details?.height) && media.media_details.height > 0 ? media.media_details.height : 800 } : null,
  };
}

export async function lookupArticle(slug, fetcher = fetch, base = process.env.WORDPRESS_API_BASE_URL || "https://jobshubhr.com/wp-json/wp/v2") {
  if (!validArticleSlug(slug)) return { kind: "not-found" };
  try {
    const root = new URL(base);
    if (root.protocol !== "https:" || root.username || root.password || root.search || root.hash) throw new Error("Invalid WordPress API configuration");
    const url = new URL(`${root.href.replace(/\/$/, "")}/posts`);
    url.search = new URLSearchParams({ slug, status: "publish", _embed: "1", per_page: "10" }).toString();
    const response = await fetcher(url, { next: { revalidate: 300 }, signal: AbortSignal.timeout(10000) });
    if (!response.ok) throw new Error("WordPress request failed");
    const posts = await response.json();
    if (!Array.isArray(posts)) throw new Error("Invalid WordPress response");
    if (posts.length === 0) return { kind: "not-found" };
    if (posts.some(item => !item || typeof item.slug !== "string" || typeof item.status !== "string")) throw new Error("Invalid WordPress response");
    const post = posts.find(item => typeof item.slug === "string" && decodedSlug(item.slug) === slug && item.status === "publish");
    if (!post) return { kind: "not-found" };
    if (!Number.isInteger(post.id) || typeof post.title?.rendered !== "string" || typeof post.content?.rendered !== "string") throw new Error("Invalid WordPress post");
    return { kind: "found", post: normalizeArticle(post) };
  } catch {
    return { kind: "unavailable" };
  }
}

export function articleMetadata(post) {
  const seo = post.seo || {};
  const canonical = `${PUBLIC_ORIGIN}${post.publicPath}`;
  const text = value => typeof value === "string" && value ? wordpressTitle(value) : undefined;
  const title = text(seo.title) || post.title;
  const description = text(seo.description);
  const image = Array.isArray(seo.og_image) ? seo.og_image.find(item => allowedUrl(item?.url, true)) : null;
  const directives = seo.robots || {};
  const preview = {};
  for (const key of ["max-snippet", "max-video-preview"]) {
    const match = typeof directives[key] === "string" && directives[key].match(new RegExp(`^${key}:(-?\\d+)$`));
    if (match) preview[key] = Number(match[1]);
  }
  const imagePreview = typeof directives["max-image-preview"] === "string" && directives["max-image-preview"].match(/^max-image-preview:(none|standard|large)$/);
  if (imagePreview) preview["max-image-preview"] = imagePreview[1];
  return {
    title, description, alternates: { canonical },
    robots: { index: directives.index !== "noindex", follow: directives.follow !== "nofollow", ...preview },
    openGraph: { type: "article", title: text(seo.og_title) || title, description: text(seo.og_description) || description, url: canonical, ...(text(seo.og_site_name) ? { siteName: text(seo.og_site_name) } : {}), ...(text(seo.og_locale) ? { locale: text(seo.og_locale) } : {}), ...(image ? { images: [{ url: image.url, alt: image.alt || "" }] } : {}), ...(post.publishedAt ? { publishedTime: post.publishedAt } : {}), ...(post.modifiedAt ? { modifiedTime: post.modifiedAt } : {}) },
    twitter: { card: seo.twitter_card === "summary_large_image" ? "summary_large_image" : "summary", title: text(seo.twitter_title) || text(seo.og_title) || title, description: text(seo.twitter_description) || text(seo.og_description) || description, ...(image ? { images: [image.url] } : {}) },
  };
}
