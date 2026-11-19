import Hero from "@/components/home/Hero";
import HomeSections from "@/components/home/HomeSections";
import Footer from "@/components/layout/Footer";

export default function Home() {
  return (
    <>
      <main>
        <Hero />
        <HomeSections />
      </main>
      <Footer />
    </>
  );
}
