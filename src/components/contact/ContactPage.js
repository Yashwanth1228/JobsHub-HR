import Link from "next/link";
import "./ContactPage.css";
import EnquiryForm from "@/components/common/EnquiryForm";

const offices = [
  { city: "Hyderabad", address: "JOBSHUB HR 1st Floor, Sl Jubilee, Plot Road No. 36, Jubilee Hills, Hyderabad, Telangana 500033", phone: "+917899253402", map: "https://maps.google.com/maps?q=JOBSHUB%20HR%20%201st%20Floor%2C%20Sl%20Jubilee%2C%20Plot%20Road%20No.%2036%2C%20Jubilee%20Hills%2C%20Hyderabad%2C%20Telangana%20500033&t=m&z=10&output=embed&iwloc=near" },
  { city: "JP Nagar, Bengaluru", address: "JOBSHUB HR 3rd floor, 1101, 24th Main Rd, above icici bank, TMC Layout, 1st Phase, Jpnagar, Bengaluru, Karnataka 560041", phone: "+91 7899253402", mapFirst: true, map: "https://maps.google.com/maps?q=JOBSHUB%20HR%20%203rd%20floor%2C%201101%2C%2024th%20Main%20Rd%2C%20above%20icici%20bank%2C%20TMC%20Layout%2C%201st%20Phase%2C%20Jpnagar%2C%20Bengaluru%2C%20Karnataka%20560041&t=m&z=10&output=embed&iwloc=near" },
  { city: "Mumbai", address: "JOBSHUB HR Gate No 32, LBS Marg Vikhroli West, Mumbai, Maharashtra 400079", phone: "+917899253402", map: "https://maps.google.com/maps?q=JOBSHUB%20HR%20Gate%20No%2032%2C%20LBS%20Marg%20Vikhroli%20West%2C%20Mumbai%2C%20Maharashtra%20400079&t=m&z=10&output=embed&iwloc=near" },
  { city: "Mysuru", address: "JOBSHUB HR 4th floor Gokulam main road 3rd Block Mysuru Karnataka 570012", phone: "+91 7899253402", mapFirst: true, map: "https://maps.google.com/maps?q=JOBSHUB%20HR%20%204th%20floor%20Gokulam%20main%20road%203rd%20Block%20Mysuru%20Karnataka%20570012&t=m&z=10&output=embed&iwloc=near" },
  { city: "Coimbatore", address: "JOBSHUB HR No 20/1 Nava India Road, Block A Udayampalayam Main Rd, Coimbatore, Tamil Nadu 641028", phone: "+917899253402", map: "https://maps.google.com/maps?q=JOBSHUB%20HR%20%20No%2020%2F1%20Nava%20India%20Road%2C%20Block%20A%20Udayampalayam%20Main%20Rd%2C%20Coimbatore%2C%20Tamil%20Nadu%20641028&t=m&z=10&output=embed&iwloc=near" },
];

function Icon({ type }) {
  return <svg className="contact-icon" viewBox="0 0 24 24" aria-hidden="true">{type === "phone" ? <><path d="M6.6 2.7 9 2l2.1 5-1.7 1.4a15.8 15.8 0 0 0 6.2 6.2l1.4-1.7 5 2.1-.7 2.4c-.4 1.5-1.8 2.6-3.4 2.4C10.4 19 5 13.6 4.2 6.1 4 4.5 5.1 3.1 6.6 2.7Z" fill="currentColor" /><path d="M16 3a6 6 0 0 1 5 5M16 6a3 3 0 0 1 2 2" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /></> : type === "email" ? <path d="M2 5h20v14H2V5Zm2 2v.3l8 5.7 8-5.7V7H4Zm16 10V9.8l-8 5.7-8-5.7V17h16Z" fill="currentColor" /> : <path d="M12 2a7 7 0 0 0-7 7c0 5 7 13 7 13s7-8 7-13a7 7 0 0 0-7-7Zm0 10a3 3 0 1 1 0-6 3 3 0 0 1 0 6Z" fill="currentColor" />}</svg>;
}

function Emails() {
  return <><a href="mailto:jobshubhrmanjula@gmail.com">jobshubhrmanjula@gmail.com</a><br /><a href="mailto:info@jobshubhr.com">info@jobshubhr.com</a></>;
}

function OfficeIcon({ type }) {
  const icons = {
  "location": {
    "viewBox": "0 0 384 512",
    "path": "M172.268 501.67C26.97 291.031 0 269.413 0 192 0 85.961 85.961 0 192 0s192 85.961 192 192c0 77.413-26.97 99.031-172.268 309.67-9.535 13.774-29.93 13.773-39.464 0zM192 272c44.183 0 80-35.817 80-80s-35.817-80-80-80-80 35.817-80 80 35.817 80 80 80z"
  },
  "email": {
    "viewBox": "0 0 576 512",
    "path": "M160 448c-25.6 0-51.2-22.4-64-32-64-44.8-83.2-60.8-96-70.4V480c0 17.67 14.33 32 32 32h256c17.67 0 32-14.33 32-32V345.6c-12.8 9.6-32 25.6-96 70.4-12.8 9.6-38.4 32-64 32zm128-192H32c-17.67 0-32 14.33-32 32v16c25.6 19.2 22.4 19.2 115.2 86.4 9.6 6.4 28.8 25.6 44.8 25.6s35.2-19.2 44.8-22.4c92.8-67.2 89.6-67.2 115.2-86.4V288c0-17.67-14.33-32-32-32zm256-96H224c-17.67 0-32 14.33-32 32v32h96c33.21 0 60.59 25.42 63.71 57.82l.29-.22V416h192c17.67 0 32-14.33 32-32V192c0-17.67-14.33-32-32-32zm-32 128h-64v-64h64v64zm-352-96c0-35.29 28.71-64 64-64h224V32c0-17.67-14.33-32-32-32H96C78.33 0 64 14.33 64 32v192h96v-32z"
  },
  "phone": {
    "viewBox": "0 0 384 512",
    "path": "M97.333 506.966c-129.874-129.874-129.681-340.252 0-469.933 5.698-5.698 14.527-6.632 21.263-2.422l64.817 40.513a17.187 17.187 0 0 1 6.849 20.958l-32.408 81.021a17.188 17.188 0 0 1-17.669 10.719l-55.81-5.58c-21.051 58.261-20.612 122.471 0 179.515l55.811-5.581a17.188 17.188 0 0 1 17.669 10.719l32.408 81.022a17.188 17.188 0 0 1-6.849 20.958l-64.817 40.513a17.19 17.19 0 0 1-21.264-2.422zM247.126 95.473c11.832 20.047 11.832 45.008 0 65.055-3.95 6.693-13.108 7.959-18.718 2.581l-5.975-5.726c-3.911-3.748-4.793-9.622-2.261-14.41a32.063 32.063 0 0 0 0-29.945c-2.533-4.788-1.65-10.662 2.261-14.41l5.975-5.726c5.61-5.378 14.768-4.112 18.718 2.581zm91.787-91.187c60.14 71.604 60.092 175.882 0 247.428-4.474 5.327-12.53 5.746-17.552.933l-5.798-5.557c-4.56-4.371-4.977-11.529-.93-16.379 49.687-59.538 49.646-145.933 0-205.422-4.047-4.85-3.631-12.008.93-16.379l5.798-5.557c5.022-4.813 13.078-4.394 17.552.933zm-45.972 44.941c36.05 46.322 36.108 111.149 0 157.546-4.39 5.641-12.697 6.251-17.856 1.304l-5.818-5.579c-4.4-4.219-4.998-11.095-1.285-15.931 26.536-34.564 26.534-82.572 0-117.134-3.713-4.836-3.115-11.711 1.285-15.931l5.818-5.579c5.159-4.947 13.466-4.337 17.856 1.304z"
  }
};
  const icon = icons[type];
  return <svg className="contact-icon" viewBox={icon.viewBox} aria-hidden="true"><path fill="currentColor" d={icon.path} /></svg>;
}

function Office({ office }) {
  const details = <div className="contact-office-details"><h2>JOBSHUB HR</h2><div className="contact-office-item"><OfficeIcon type="location" /><div><h3>Office location</h3><p>{office.address}</p></div></div><div className="contact-office-item"><OfficeIcon type="email" /><div><h3>Email - ID</h3><p><Emails /></p></div></div><div className="contact-office-item"><OfficeIcon type="phone" /><div><h3>Get in touch</h3><p><a href="tel:+917899253402">{office.phone}</a></p></div></div></div>;
  const map = <div className="contact-map"><iframe title={`JobsHub HR office location in ${office.city}`} src={office.map} loading="lazy" referrerPolicy="strict-origin-when-cross-origin" /></div>;
  return <section className="contact-office contact-wrap" aria-label={`${office.city} office`}>{office.mapFirst ? <>{map}{details}</> : <>{details}{map}</>}</section>;
}

export default function ContactPage() {
  return <>
    <section className="contact-banner"><div className="contact-wrap contact-banner-inner"><div><h1>Contact Us</h1><nav aria-label="Breadcrumb"><Link href="/">Home</Link><span aria-hidden="true">»</span><span aria-current="page">Contact Us</span></nav></div><p>Have questions or need assistance? Reach out to us today.</p></div></section>
    <section className="contact-strip" aria-label="Contact information"><div className="contact-wrap contact-strip-inner"><div className="contact-strip-item"><Icon type="location" /><div><h2>JobsHub HR Employement Agency</h2><p>240/C, 3rd Block, BDA Layout, 2nd Stage, Naagarabhaavi, Bengaluru, Karnataka 560072</p></div></div><div className="contact-strip-item"><Icon type="email" /><div><h2>Email - ID</h2><p><Emails /></p></div></div><div className="contact-strip-item"><Icon type="phone" /><div><h2>Get in touch</h2><p><a href="tel:+919740943402">+919740943402</a></p></div></div></div></section>
    <section className="contact-intro contact-wrap"><div className="contact-intro-text"><h2>Contact our recruitment agency for hr professionals</h2><p>Find the Perfect employees with JOBSHUB HR, Top recruitment agency in Bangalore and the best HR consultancy service provider in India offering expert hiring solutions for employers and job seekers. Find the right talent today</p><a className="contact-call" href="tel:+919740943402"><Icon type="phone" /><span>Call us now<br />+919740943402</span></a></div>
      <EnquiryForm type="contact" enabled={process.env.NODE_ENV === 'development' && process.env.ENQUIRIES_LOCAL_TEST === 'true' && process.env.ENQUIRIES_WORDPRESS_ORIGIN === 'https://jobshubhr-test.local'} />
    </section>
    {offices.map(office => <Office key={office.city} office={office} />)}
  </>;
}
