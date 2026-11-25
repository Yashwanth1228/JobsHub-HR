import Link from "next/link";
import "./RecruitmentIntroduction.css";

const industries = ["Retail", "Manufacturing", "Healthcare", "FMCG", "Logistics", "Finance", "Non-IT"];

export default function RecruitmentIntroduction() {
  return (
    <section className="recruitment-introduction" aria-labelledby="recruitment-introduction-heading">
      <div className="recruitment-introduction__inner">
        <p className="recruitment-introduction__label">YOUR TRUSTED RECRUITMENT PARTNER</p>
        <h2 id="recruitment-introduction-heading">Top Recruitment Agency in Bangalore for Complete Hiring Solutions</h2>
        <div className="recruitment-introduction__divider" aria-hidden="true" />
        <div className="recruitment-introduction__copy">
          <p>Finding the right employees is essential for every successful business. JobsHub HR is a recruitment and staffing service provider in Bangalore, helping companies connect with suitable candidates across different industries.</p>
          <p>As a recruitment agency in Bangalore, we support businesses with permanent recruitment, temporary staffing, contract staffing and bulk hiring solutions. Our recruitment team understands the specific hiring requirements of every organization and works to identify candidates who match the required skills, experience and job responsibilities.</p>
          <p>Businesses looking for reliable recruitment agencies in Bangalore can approach JobsHub HR for structured recruitment support. From understanding job requirements and sourcing candidates to screening, interview coordination and selection support, we help simplify the hiring process.</p>
          <h3>Industries We Serve</h3>
          <p>Our recruitment services cover industries such as retail, manufacturing, healthcare, FMCG, logistics, finance and non-IT sectors.</p>
          <ul className="recruitment-introduction__industries">
            {industries.map((industry) => <li key={industry}><span aria-hidden="true">✓</span>{industry}</li>)}
          </ul>
          <p>Whether your company needs a few skilled professionals or a larger workforce, JobsHub HR provides recruitment solutions designed around your business requirements.</p>
          <p>Looking for recruitment support in Bangalore? Contact JobsHub HR to discuss your hiring requirements.</p>
        </div>
        <div className="recruitment-introduction__action">
          <Link href="/contact-us/">Contact Us <svg aria-hidden="true" viewBox="0 0 24 24" fill="none"><path d="M4 12h15m-6-6 6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg></Link>
        </div>
      </div>
    </section>
  );
}
