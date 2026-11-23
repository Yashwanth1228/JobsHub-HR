import Image from "next/image";
import { notFound } from "next/navigation";
import Footer from "@/components/layout/Footer";
import { getArticleBySlug } from "@/lib/articles";
import { articleMetadata } from "@/lib/article-core.mjs";
import "./article.css";

export const instant = false;

async function resolveArticle(slug) {
  const result = await getArticleBySlug(slug);
  if (result.kind === "not-found") notFound();
  if (result.kind === "unavailable") throw new Error("Article service is temporarily unavailable.");
  return result.post;
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  return articleMetadata(await resolveArticle(slug));
}

export default async function ArticlePage({ params }) {
  const { slug } = await params;
  const post = await resolveArticle(slug);
  const date = /^\d{4}-\d{2}-\d{2}/.test(post.publishedAt || "") ? new Date(`${post.publishedAt.slice(0, 10)}T00:00:00Z`) : new Date(NaN);
  return <><main className="article-page"><article className="article-container">
    <h1>{post.title}</h1>
    {Number.isFinite(date.getTime()) && <time dateTime={post.publishedAt}>{new Intl.DateTimeFormat("en-IN", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" }).format(date)}</time>}
    {post.featuredImage && <Image className="article-featured" src={post.featuredImage.url} alt={post.featuredImage.alt} width={post.featuredImage.width} height={post.featuredImage.height} sizes="(max-width: 767px) 100vw, 1000px" unoptimized />}
    {post.content ? <div className="article-body" dangerouslySetInnerHTML={{ __html: post.content }} /> : <p>Article content is currently unavailable.</p>}
  </article></main><Footer /></>;
}
