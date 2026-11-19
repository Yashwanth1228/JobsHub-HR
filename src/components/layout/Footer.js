import Image from "next/image";
import Link from "next/link";

const pages = [["About Us", "/about-us/"], ["Services", "/services/"], ["Our Blog", "/top-recruitment-agency-in-bangalore/"], ["Contact Us", "/contact-us/"]];
const services = ["Temporary Staffing Services", "Permanent Staffing Services", "Staffing Services", "Manpower Services", "Background Verification Services"];
const social = [["Facebook", "https://www.facebook.com/profile.php?id=61563027690882&mibextid=ZbWKwL"], ["X", "https://x.com/HubHr72674?t=hoI9mc04bhiRU0Q9WzcuJw&s=09"], ["YouTube", "https://youtube.com/@jobshubhr?si=TyvpssMyIf4Gg2TC"], ["Instagram", "https://www.instagram.com/jobs_hub_hr?utm_source=qr&igsh=NmxucGdjbDJqMDJ1"], ["LinkedIn", "https://www.linkedin.com/company/jobs-hub-hr-employement-agency/"]];

export default function Footer() {
  return (
    <footer className="bg-[#23222a] text-white">
      <div className="mx-auto grid max-w-[1150px] gap-10 px-6 py-16 sm:grid-cols-2 lg:grid-cols-4 md:px-8">
        <div><Link href="/" aria-label="JobsHub HR home"><Image src="/images/jobshubhr-logo.jpeg" alt="JobsHub HR" width={170} height={121} className="h-auto w-32" /></Link><p className="mt-5 leading-relaxed">At JobsHub HR, we focus on helping companies efficiently find and hire the best talent to meet their staffing needs.</p><div className="mt-5 flex flex-wrap gap-3">{social.map(([label, href]) => <a key={label} href={href} target="_blank" rel="noopener noreferrer" className="underline focus-visible:outline-2">{label}</a>)}</div></div>
        <div><h2 className="text-xl font-semibold">Services</h2><ul className="mt-5 space-y-3">{services.map(service => <li key={service}>{service}</li>)}</ul></div>
        <nav aria-label="Footer navigation"><h2 className="text-xl font-semibold">Utility pages</h2><ul className="mt-5 space-y-3">{pages.map(([label, href]) => <li key={href}><Link href={href} className="hover:underline focus-visible:outline-2">{label}</Link></li>)}</ul></nav>
        <div><h2 className="text-xl font-semibold">Get in touch</h2><address className="mt-5 space-y-3 not-italic"><p><a href="tel:+919740943402" className="hover:underline">+91 9740943402</a></p><p><a href="mailto:jobshubhrmanjula@gmail.com" className="break-all hover:underline">jobshubhrmanjula@gmail.com</a></p><p>JobsHub HR Employement Agency 240/C, 3rd Block, BDA Layout, 2nd Stage, Naagarabhaavi, Bengaluru, Karnataka 560072</p></address></div>
      </div>
      <div className="border-t border-white/30"><div className="mx-auto flex max-w-[1150px] flex-col justify-between gap-3 px-6 py-5 text-sm md:flex-row md:px-8"><p>Copyright © 2026 JOBSHUB HR | Powered by JOBSHUB HR</p><p>Terms And Conditions | Privacy Policy</p></div></div>
    </footer>
  );
}
