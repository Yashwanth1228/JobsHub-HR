const POSTS_URL = `${(process.env.WORDPRESS_API_BASE_URL || "https://jobshubhr.com/wp-json/wp/v2").replace(/\/$/, "")}/posts`;
const POSTS_PER_PAGE = 21;

// Called only by server components. WordPress controls the published post order.
export async function getPublishedPosts(requestedPage = 1) {
  const targetPage = Number.isSafeInteger(requestedPage) && requestedPage > 0 ? requestedPage : 1;
  const posts = [];
  const seen = new Set();
  let totalPages = 1;

  try {
    for (let page = 1; page <= Math.min(targetPage, totalPages); page += 1) {
      const url = new URL(POSTS_URL);
      url.search = new URLSearchParams({ _embed: "1", status: "publish", orderby: "date", order: "desc", per_page: String(POSTS_PER_PAGE), page: String(page) }).toString();
      const response = await fetch(url, { next: { revalidate: 300 } });
      if (!response.ok) throw new Error(`WordPress returned ${response.status}`);
      const result = await response.json();
      if (!Array.isArray(result)) throw new Error("Invalid WordPress response");
      totalPages = Number(response.headers.get("x-wp-totalpages")) || 1;
      for (const post of result) {
        if (!seen.has(post.id)) {
          seen.add(post.id);
          posts.push(post);
        }
      }
    }
    return { posts, page: Math.min(targetPage, totalPages), hasMore: targetPage < totalPages, error: false };
  } catch (error) {
    console.error("Unable to load published WordPress posts:", error.message);
    return { posts: [], page: 1, hasMore: false, error: true };
  }
}

export function wordpressTitle(value = "") {
  const entities = { amp: "&", quot: '"', apos: "'", lt: "<", gt: ">", nbsp: " ", ndash: "–", mdash: "—", hellip: "…", lsquo: "‘", rsquo: "’", ldquo: "“", rdquo: "”" };
  return value.replace(/<[^>]*>/g, "").replace(/&(#x[\da-f]+|#\d+|[a-z]+);/gi, (match, entity) => {
    if (entity[0] !== "#") return entities[entity.toLowerCase()] ?? match;
    const code = entity[1].toLowerCase() === "x" ? parseInt(entity.slice(2), 16) : parseInt(entity.slice(1), 10);
    return code > 0 && code <= 0x10ffff && !(code >= 0xd800 && code <= 0xdfff) ? String.fromCodePoint(code) : match;
  });
}

export function wordpressImage(post) {
  const media = post._embedded?.["wp:featuredmedia"]?.[0];
  const source = media?.media_details?.sizes?.medium?.source_url || media?.source_url;
  try {
    const url = new URL(source);
    return url.protocol === "https:" && ["jobshubhr.com", "www.jobshubhr.com"].includes(url.hostname) ? url.href : null;
  } catch {
    return null;
  }
}
