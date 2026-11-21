import Link from "next/link";
import "./ContactPage.css";

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

function Office({ office }) {
  const details = <div className="contact-office-details"><h2>JOBSHUB HR</h2><div className="contact-office-item"><Icon type="location" /><div><h3>Office location</h3><p>{office.address}</p></div></div><div className="contact-office-item"><Icon type="email" /><div><h3>Email - ID</h3><p><Emails /></p></div></div><div className="contact-office-item"><Icon type="phone" /><div><h3>Get in touch</h3><p><a href="tel:+917899253402">{office.phone}</a></p></div></div></div>;
  const map = <div className="contact-map"><iframe title={`JobsHub HR office location in ${office.city}`} src={office.map} loading="lazy" referrerPolicy="strict-origin-when-cross-origin" /></div>;
  return <section className="contact-office contact-wrap" aria-label={`${office.city} office`}>{office.mapFirst ? <>{map}{details}</> : <>{details}{map}</>}</section>;
}

export default function ContactPage() {
  return <>
    <section className="contact-banner"><div className="contact-wrap contact-banner-inner"><div><h1>Contact Us</h1><nav aria-label="Breadcrumb"><Link href="/">Home</Link><span aria-hidden="true">»</span><span aria-current="page">Contact Us</span></nav></div><p>Have questions or need assistance? Reach out to us today.</p></div></section>
    <section className="contact-strip" aria-label="Contact information"><div className="contact-wrap contact-strip-inner"><div className="contact-strip-item"><Icon type="location" /><div><h2>JobsHub HR Employement Agency</h2><p>240/C, 3rd Block, BDA Layout, 2nd Stage, Naagarabhaavi, Bengaluru, Karnataka 560072</p></div></div><div className="contact-strip-item"><Icon type="email" /><div><h2>Email - ID</h2><p><Emails /></p></div></div><div className="contact-strip-item"><Icon type="phone" /><div><h2>Get in touch</h2><p><a href="tel:+919740943402">+919740943402</a></p></div></div></div></section>
    <section className="contact-intro contact-wrap"><div className="contact-intro-text"><h2>Contact our recruitment agency for hr professionals</h2><p>Find the Perfect employees with JOBSHUB HR, Top recruitment agency in Bangalore and the best HR consultancy service provider in India offering expert hiring solutions for employers and job seekers. Find the right talent today</p><a className="contact-call" href="tel:+919740943402"><Icon type="phone" /><span>Call us now<br />+919740943402</span></a></div>
      <div className="contact-form" role="form" aria-label="Contact us" aria-describedby="contact-unavailable"><div className="contact-fields"><label><span className="contact-sr-only">Name</span><input type="text" name="name" placeholder="Name" autoComplete="name" /></label><label><span className="contact-sr-only">Phone Number</span><input type="tel" name="phone" placeholder="Phone Number" autoComplete="tel" pattern="[0-9()#&amp;+*\-=.]+" title="Only numbers and phone characters (#, -, *, etc) are accepted." /></label><label className="contact-full"><span className="contact-sr-only">Email</span><input type="email" name="email" placeholder="Email" autoComplete="email" required /></label><fieldset className="contact-full"><legend>Select Type</legend><label><input type="radio" name="type" value="Candidate" required /> Candidate</label><label><input type="radio" name="type" value="Company" required /> Company</label></fieldset><label className="contact-full"><span className="contact-sr-only">Message</span><textarea name="message" placeholder="Message" rows={4} /></label><div className="contact-full"><button type="button" disabled>Send</button></div></div><p id="contact-unavailable" className="contact-notice">Online submissions are not yet available in this development version.</p></div>
    </section>
    {offices.map(office => <Office key={office.city} office={office} />)}
  </>;
}
