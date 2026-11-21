import { Suspense } from "react";
import BlogPage from "@/components/blog/BlogPage";
import Footer from "@/components/layout/Footer";

export const metadata = {
  title: "Top Recruitment Agency in Bangalore",
  description: "Stay updated with hiring trends, tips, and insights from JobsHub HR – a leading recruitment agency in Bangalore helping job seekers thrive.",
};

export default function Blog({ searchParams }) {
  return <><main><Suspense fallback={<p>Loading blog posts…</p>}><BlogPage searchParams={searchParams} /></Suspense></main><Footer /></>;
}
