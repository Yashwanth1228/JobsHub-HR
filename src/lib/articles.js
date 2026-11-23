import "server-only";
import { cache } from "react";
import { lookupArticle } from "./article-core.mjs";

export const getArticleBySlug = cache(lookupArticle);
