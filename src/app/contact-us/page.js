import ContactPage from "@/components/contact/ContactPage";
import Footer from "@/components/layout/Footer";

export const metadata = {
  title: "Recruitment Agency in Bangalore | JobsHub HR",
  description: "Top recruitment agency in Bangalore offering expert hiring solutions for employers and job seekers. Find the right talent today",
  alternates: { canonical: "https://jobshubhr.com/contact-us/" },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 } },
};

export default function ContactUs() {
  return <><main><ContactPage /></main><Footer /></>;
}
