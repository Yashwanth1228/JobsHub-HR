"use client";

export default function ArticleError({ reset }) {
  return <main style={{ maxWidth: "800px", margin: "4rem auto", padding: "0 1.5rem" }}><h1>Article temporarily unavailable</h1><p>Please try again shortly.</p><button type="button" onClick={() => reset()} style={{ marginTop: "1rem", textDecoration: "underline" }}>Try again</button></main>;
}
