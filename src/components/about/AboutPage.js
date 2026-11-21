import Image from "next/image";
import Link from "next/link";
import "./AboutPage.css";

const team = [
  { name: "Pavitra", image: "WhatsApp-Image-2025-06-09-at-5.04.42-PM.jpeg" },
  { name: "Manasa", image: "WhatsApp-Image-2025-06-11-at-4.27.24-PM.jpeg" },
  { name: "Komala", image: "new.jpeg" },
  { name: "Vishali", image: "vishali-1.jpeg" },
  { name: "Fouziya", image: "fouziya.jpeg" },
  { name: "Deepa", image: "WhatsApp-Image-2025-06-21-at-2.16.12-PM-e1750496954826.jpeg" },
  { name: "Shashi", image: "shashi.jpeg" },
  { name: "Sowmya", image: "swomya.jpeg" },
  { name: "Ramya", image: "WhatsApp-Image-2025-06-11-at-4.27.10-PM.jpeg" },
];

const values = [
  { number: ".01", title: "Our Mission", image: "hiring-career-employment-human-resources-concept-scaled.jpg", alt: "Recruitment and human resources concept", text: "JobsHub HR is dedicated to assisting companies in efficiently finding and hiring top talent to meet their staffing needs. As recruitment specialists, they offer essential support to organizations by streamlining hiring processes, reducing costs, saving time, and improving the quality of new hires. Their in-depth knowledge of recruitment strategies positions them as a reliable partner in enhancing the hiring experience for businesses." },
  { number: ".02", title: "Our Vision", image: "recruitment-consulting-venn-diagram-scaled.jpg", alt: "Recruitment consulting diagram", text: "Under the leadership of CEO Manjula Krishnamurthy, JobsHub HR emphasizes transforming HR solutions through strategic vision and a commitment to excellence. Manjula's dedication to fostering talent and innovation has been pivotal in establishing JobsHub HR as a respected leader in the industry." },
];

export default function AboutPage() {
  return (
    <>
      <section className="about-banner">
        <div className="about-wrap about-banner-inner">
          <div><h1>About Us</h1><nav aria-label="Breadcrumb"><Link href="/">Home</Link><span aria-hidden="true"> » </span><span aria-current="page">About Us</span></nav></div>
          <p>Learn more about our mission, values, and the team behind our success.</p>
        </div>
      </section>
      <section className="about-introduction about-wrap" aria-labelledby="about-intro-heading">
        <div className="about-intro-image"><Image src="/images/faq/day-office-travel-agency-scaled.jpg" alt="People working together in an office" fill sizes="(max-width: 767px) 90vw, 45vw" /></div>
        <div className="about-intro-copy"><p className="about-label">About Us</p><h2 id="about-intro-heading">We are top and best recruitment agency</h2><p>We are one of the leading players in the staffing and recruitment industry. As a top recruitment agency in Bangalore, JobsHub HR connects businesses with qualified and reliable talent through a structured hiring process. Our services include candidate sourcing and screening, interview coordination, background verification, and talent evaluation. Moreover, our experienced recruitment team helps businesses streamline their hiring process, reduce recruitment challenges, and build a skilled and productive workforce.</p></div>
      </section>
      <section className="about-values" aria-labelledby="about-values-heading">
        <div className="about-wrap"><header className="about-values-heading"><p className="about-label">Integrity Growth</p><h2 id="about-values-heading">Driving purpose, vision, and values into action</h2></header>
          <div className="about-values-grid">{values.map(item => <article key={item.number} className="about-value"><p className="about-number">{item.number}</p><Image src={`/images/about/${item.image}`} alt={item.alt} width={700} height={580} className="about-value-image" /><h3>{item.title}</h3><p>{item.text}</p></article>)}</div>
        </div>
      </section>
      <section className="about-team about-wrap" aria-labelledby="about-team-heading">
        <header><p className="about-label">Our team</p><h2 id="about-team-heading">Meet our professional team member</h2></header>
        <div className="about-team-grid">{team.map(person => <article className="about-team-card" key={person.name}><h3><span className="about-team-desktop-name">{person.name}</span><span className="about-team-mobile-name">{person.name === "Pavitra" ? "Pavitra - HR Recruiter" : person.name}</span></h3><div className="about-team-image"><Image src={`/images/about/${person.image}`} alt={`${person.name}, JobsHub HR team member`} fill sizes="(max-width: 767px) 90vw, (max-width: 1024px) 45vw, 25vw" /></div></article>)}</div>
      </section>
    </>
  );
}
