import Image from "next/image";
import Link from "next/link";
import { getPublishedPosts, wordpressImage, wordpressTitle } from "@/lib/wordpress";
import "./BlogPage.css";

const sections = [
  ["Industry Expertise You Can Rely On", "Recruitment is a dynamic field that evolves with changing industries. As the top recruitment agency in Bangalore for the retail industry, we provide updates on retail hiring trends, customer-facing skills in demand, and how companies can attract and retain the best retail professionals. Our blogs give retail employers strategies to improve staffing efficiency, while helping job seekers prepare for careers in this vibrant sector."],
  ["Thought Leadership in Recruitment", "JobsHub HR goes beyond filling roles. As a top manpower consultant, we use our blog to guide businesses on talent management, workforce planning, and employee engagement. From tips on writing job descriptions to building strong company cultures, our blog is a resource for organizations seeking practical HR solutions."],
  ["Manufacturing Industry Insights", "The manufacturing industry continues to be a cornerstone of Bangalore’s economy. As a trusted manufacturing units employment agency in Bangalore, our blog covers workforce issues like automation, skilled labor shortages, and training needs. For manufacturing units, our insights offer strategies to improve manpower stability and productivity."],
  ["Healthcare HR Expertise", "Healthcare is one of the most talent-sensitive industries. As a dedicated HR agency for the healthcare industry, we use our blog to highlight challenges in medical recruitment, compliance requirements, and the importance of cultural fit in healthcare settings. We also provide tips for healthcare professionals to advance their careers."],
  ["Why Follow Our Blog?", "Many businesses call us the best recruitment agency in Bangalore, and our blog is one reason why. Through well-researched articles, real-world case studies, and practical HR advice, we empower both employers and candidates to make informed decisions."],
];

export default async function BlogPage({ searchParams }) {
  const params = await searchParams;
  const requestedPage = Number(params?.page || 1);
  const { posts, page, hasMore, error } = await getPublishedPosts(requestedPage);
  return <>
    <section className="blog-banner">
      <div className="blog-wrap blog-banner-inner">
        <div><h1>Our Blog</h1><nav aria-label="Breadcrumb"><Link href="/">Home</Link><span aria-hidden="true">»</span><span aria-current="page">Our Blog</span></nav></div>
        <p>Explore real-world examples of how we&apos;ve made a difference.</p>
      </div>
    </section>
    <section className="blog-wrap blog-listing" aria-label="Blog posts">
      {error ? <p role="status">Blog posts are currently unavailable. Please try again later.</p> : posts.length === 0 ? <p>No published posts are available.</p> : <>
        <div className="blog-grid">{posts.map((post) => {
          const title = wordpressTitle(post.title?.rendered);
          const image = wordpressImage(post);
          const href = `/${encodeURIComponent(post.slug)}/`;
          return <article className="blog-card" key={post.id}>
            <Link href={href} aria-label={title} className="blog-card-image">{image ? <Image src={image} alt="" width={600} height={400} sizes="(max-width: 767px) 100vw, (max-width: 1024px) 50vw, 33vw" unoptimized /> : <span className="blog-image-missing">Featured image unavailable</span>}</Link>
            <h2><Link href={href}>{title}</Link></h2>
            <Link className="blog-read-more" href={href} aria-label={`Read more: ${title}`}>Read More »</Link>
          </article>;
        })}</div>
        {hasMore && <div className="blog-more"><Link href={`?page=${page + 1}`} scroll={false}>Load More</Link></div>}
      </>}
    </section>
    <section className="blog-wrap blog-information" aria-label="About the JobsHub HR blog">
      <p>Welcome to the JobsHub HR blog, a knowledge hub where we share expertise, hiring insights, and career advice. Our blog reflects the same philosophy that drives our success as the top recruitment agency in Bangalore—building meaningful connections between businesses and professionals.</p>
      {sections.map(([heading, text]) => <div key={heading}><p><strong>{heading}</strong></p><p>{text}</p></div>)}
    </section>
  </>;
}
