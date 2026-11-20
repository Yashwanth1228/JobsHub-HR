import Image from "next/image";
import Link from "next/link";

const pages = [["About Us", "/about-us/"], ["Services", "/services/"], ["Our Blog", "/top-recruitment-agency-in-bangalore/"], ["Contact Us", "/contact-us/"]];
const services = ["Temporary Staffing Services", "Permanent Staffing Services", "Staffing Services", "Manpower Services", "Background Verification Services"];
const social = [["Facebook", "https://www.facebook.com/profile.php?id=61563027690882&mibextid=ZbWKwL"], ["X", "https://x.com/HubHr72674?t=hoI9mc04bhiRU0Q9WzcuJw&s=09"], ["YouTube", "https://youtube.com/@jobshubhr?si=TyvpssMyIf4Gg2TC"], ["Instagram", "https://www.instagram.com/jobs_hub_hr?utm_source=qr&igsh=NmxucGdjbDJqMDJ1"], ["LinkedIn", "https://www.linkedin.com/company/jobs-hub-hr-employement-agency/"]];

const icons = {
  Facebook: "M24 12a12 12 0 1 0-13.9 11.85v-8.38H7.08V12h3.02V9.36c0-2.99 1.79-4.64 4.51-4.64 1.31 0 2.68.23 2.68.23v2.95h-1.51c-1.48 0-1.94.92-1.94 1.87V12h3.31l-.53 3.47h-2.78v8.38A12 12 0 0 0 24 12Z",
  X: "M18.9 2H22l-6.78 7.75L23.2 22h-6.25l-4.9-7.46L5.53 22H2.4l7.25-8.29L1.8 2h6.4l4.43 6.84L18.9 2Zm-1.1 18h1.73L7.25 3.9H5.4L17.8 20Z",
  YouTube: "M23.5 6.2a3 3 0 0 0-2.1-2.1C19.55 3.6 12 3.6 12 3.6s-7.55 0-9.4.5A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.85.5 9.4.5 9.4.5s7.55 0 9.4-.5a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.8ZM9.6 15.6V8.4l6.23 3.6-6.23 3.6Z",
  Instagram: "M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5Zm0 2a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H7Zm5 3a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6Zm5.5-3a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5Z",
  LinkedIn: "M20.45 2H3.55C2.69 2 2 2.68 2 3.52v16.96C2 21.32 2.69 22 3.55 22h16.9c.86 0 1.55-.68 1.55-1.52V3.52C22 2.68 21.31 2 20.45 2ZM7.93 18.75H4.96V9.2h2.97v9.55ZM6.45 7.9a1.72 1.72 0 1 1 0-3.44 1.72 1.72 0 0 1 0 3.44Zm12.3 10.85h-2.96V14.1c0-1.11-.02-2.54-1.55-2.54-1.55 0-1.79 1.21-1.79 2.46v4.73H9.49V9.2h2.84v1.31h.04a3.11 3.11 0 0 1 2.8-1.54c2.99 0 3.58 1.97 3.58 4.53v5.25Z",
  phone: "M6.6 2.7 9 2l2.1 5-1.7 1.4a15.8 15.8 0 0 0 6.2 6.2l1.4-1.7 5 2.1-.7 2.4c-.4 1.5-1.8 2.6-3.4 2.4C10.4 19 5 13.6 4.2 6.1 4 4.5 5.1 3.1 6.6 2.7Z",
  email: "M2 5h20v14H2V5Zm2 2v.3l8 5.7 8-5.7V7H4Zm16 10V9.8l-8 5.7-8-5.7V17h16Z",
  address: "M5 2h14v19h2v1H3v-1h2V2Zm2 2v17h3v-4h4v4h3V4H7Zm2 2h2v2H9V6Zm4 0h2v2h-2V6ZM9 10h2v2H9v-2Zm4 0h2v2h-2v-2Z",
};

function Icon({ name, className }) {
  return <svg aria-hidden="true" viewBox="0 0 24 24" className={className}><path d={icons[name]} /></svg>;
}

export default function Footer() {
  return (
    <footer className="bg-[#ddd] text-black">
      <div className="mx-auto grid max-w-[1200px] gap-10 px-6 py-12 sm:grid-cols-2 md:px-[30px] lg:grid-cols-[1.18fr_0.9fr_0.69fr_1.38fr] lg:gap-[60px] lg:pt-[60px] lg:pb-[120px]">
        <div className="min-w-0"><Link href="/" aria-label="JobsHub HR home"><Image src="/images/jobshubhr-logo.jpeg" alt="JobsHub HR" width={170} height={121} className="h-24 w-24 object-contain" /></Link><p className="mt-6 leading-6">At JobsHub HR, we focus on helping companies efficiently find and hire the best talent to meet their staffing needs.</p><div className="mt-8 flex flex-wrap gap-[7px]">{social.map(([label, href]) => <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label} className="flex h-9 w-9 items-center justify-center rounded-full border border-[#313131] bg-white text-[#b61a00] focus-visible:outline-2 focus-visible:outline-offset-2"><Icon name={label} className="h-4 w-4 fill-current" /></a>)}</div></div>
        <div className="min-w-0"><h2 className="text-base font-normal text-[#b61a00]">Services</h2><ul className="mt-4 space-y-[15px] font-medium leading-6">{services.map(service => <li key={service}>{service}</li>)}</ul></div>
        <nav aria-label="Footer navigation" className="min-w-0"><h2 className="text-base font-normal text-[#b61a00]">Utility pages</h2><ul className="mt-4 space-y-[15px] font-medium leading-6">{pages.map(([label, href]) => <li key={href}><Link href={href} className="hover:underline focus-visible:outline-2">{label}</Link></li>)}</ul></nav>
        <div className="min-w-0"><h2 className="text-base font-normal text-[#b61a00]">Get in touch</h2><address className="mt-4 space-y-[15px] leading-6 not-italic"><p className="flex gap-2"><Icon name="phone" className="mt-1 h-4 w-4 shrink-0 fill-[#b61a00]" /><a href="tel:+919740943402" className="hover:underline">+91 9740943402</a></p><p className="flex gap-2"><Icon name="email" className="mt-1 h-4 w-4 shrink-0 fill-[#b61a00]" /><a href="mailto:jobshubhrmanjula@gmail.com" className="min-w-0 break-all hover:underline">jobshubhrmanjula@gmail.com</a></p><p className="flex gap-2"><Icon name="address" className="mt-1 h-4 w-4 shrink-0 fill-[#b61a00]" /><span>JobsHub HR Employement Agency 240/C, 3rd Block, BDA Layout, 2nd Stage, Naagarabhaavi, Bengaluru, Karnataka 560072</span></p></address></div>
      </div>
      <div className="bg-[#23222a] text-white"><div className="mx-auto flex max-w-[1200px] flex-col justify-between gap-3 px-6 py-5 text-base md:flex-row md:px-[30px]"><p>Copyright © 2026 JOBSHUB HR | Powered by JOBSHUB HR</p><p>Terms And Conditions | Privacy Policy</p></div></div>
    </footer>
  );
}
