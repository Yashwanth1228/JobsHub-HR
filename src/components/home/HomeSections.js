import Image from "next/image";
import Link from "next/link";
import { clientLogos, faqs, posts, processes, services, testimonials } from "./homeContent";

const wrap = "mx-auto max-w-[1150px] px-6 md:px-8";
const heading = "text-3xl font-semibold leading-tight md:text-4xl";
const img = (name) => `/images/home/${name}`;

export default function HomeSections() {
  return (
    <>
      <section aria-labelledby="process-heading" className="bg-[#b61a00] py-16 text-white md:py-20">
        <div className={wrap}>
          <p>Our Process</p><h2 id="process-heading" className={`${heading} mt-2`}>Our Working Process</h2>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {processes.map((item) => <article key={item.title} className="overflow-hidden rounded-[20px] bg-white text-[#303030]">
              <Image src={img(item.image)} alt="" width={800} height={533} sizes="(max-width: 767px) 90vw, 33vw" className="h-52 w-full object-cover" />
              <div className="p-6"><h3 className="text-xl font-semibold">{item.title}</h3><p className="mt-3 leading-relaxed">{item.text}</p></div>
            </article>)}
          </div>
        </div>
      </section>

      <section aria-labelledby="about-heading" className="py-16 text-[#303030] md:py-20">
        <div className={wrap}>
          <div className="grid gap-5 md:grid-cols-3">
            {[['Employee Retention Rate', '85% average retention after 12 months using our solutions'], ['', '50% increase in diverse hires'], ['Employee Satisfaction', '90% employee satisfaction after implementing management improvements.']].map(([title, text]) => <div key={text} className="rounded-[20px] border border-[#b61a00] p-6">{title && <h3 className="font-semibold">{title}</h3>}<p className="mt-2">{text}</p></div>)}
          </div>
          <div className="mt-16 grid gap-8 md:grid-cols-[1fr_2fr]">
            <div><p className="text-[#b61a00]">About Us</p><h2 id="about-heading" className={`${heading} mt-2`}>We are top and best recruitment agency in Bangalore</h2></div>
            <div className="space-y-4 leading-relaxed">
              <p>JobsHub HR provides comprehensive HR solutions designed to help businesses build a skilled, productive, and engaged workforce. As a top recruitment agency in Bangalore, we offer professional services including recruitment, staffing, payroll management, HR compliance, and employee relations.</p>
              <p>Moreover, our HR solutions include developing and implementing effective HR policies and procedures, managing employee benefits, and supporting businesses in handling employee-related matters. In addition, we help companies streamline their HR processes while maintaining compliance with applicable labour laws and regulations.</p>
              <p>With a professional and client-focused approach, JobsHub HR supports businesses in managing their workforce efficiently and achieving their long-term HR goals. As a best recruitment agency in Bangalore, we provide reliable and customized HR solutions to meet the unique staffing needs of businesses. Therefore, our end-to-end HR services offer professional support for recruitment, staffing, and overall workforce management.</p>
              <ul className="grid gap-2 sm:grid-cols-2">{["Insightful analytics", "Smarter strategies", "Actionable outcomes", "Informed growth"].map(x => <li key={x}>✓ {x}</li>)}</ul>
            </div>
          </div>
        </div>
      </section>

      <section aria-labelledby="services-heading" className="bg-[#f8f8f8] py-16 text-[#303030] md:py-20">
        <div className={wrap}><h2 id="services-heading" className={heading}>Our Services</h2>
          <p className="mt-4 max-w-3xl leading-relaxed">At JOBSHUB HR, we provide a full range of HR services for companies in Bangalore. As a trusted recruitment agency in Bangalore, we deliver smart and efficient staffing solutions that help your business grow with the right people.</p>
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">{services.map(item => <article key={item.title} className="rounded-[20px] border border-[#b61a00] bg-white p-7"><h3 className="text-xl font-semibold">{item.title}</h3><p className="mt-4 leading-relaxed">{item.text}</p></article>)}</div>
        </div>
      </section>

      <section aria-labelledby="ceo-heading" className="py-16 text-[#303030] md:py-20"><div className={`${wrap} grid items-center gap-10 md:grid-cols-2`}>
        <Image src={img("ceo-new.jpeg")} alt="Manjula Krishnamurthy" width={700} height={700} sizes="(max-width: 767px) 90vw, 40vw" className="w-full max-w-[500px] rounded-[20px] object-cover" />
        <div><p className="text-[#b61a00]">CEO OF JobsHub HR</p><h2 id="ceo-heading" className={`${heading} mt-2`}>Manjula Krishnamurthy</h2><p className="mt-5 leading-relaxed">Manjula Krishna Murthy, a forward-thinking leader and CEO of JobsHub HR, is dedicated to transforming HR solutions. Her strategic vision and unwavering commitment to excellence have played a pivotal role in establishing JobsHub HR as a respected leader in the industry. Manjula’s dedication to fostering talent and innovation continues to drive JobsHub HR success in the dynamic HR landscape.</p></div>
      </div></section>

      <section aria-labelledby="clients-heading" className="bg-[#f8f8f8] py-16"><div className={wrap}><h2 id="clients-heading" className={heading}>Our Clients</h2><div tabIndex={0} aria-label="Client logos, scroll horizontally to see more" className="mt-8 flex gap-8 overflow-x-auto pb-4 focus-visible:outline-2 focus-visible:outline-[#b61a00]">{clientLogos.map((logo, index) => <div key={logo} className="flex h-24 w-36 shrink-0 items-center justify-center rounded bg-white p-3"><Image src={img(logo)} alt={`Client logo ${index + 1}`} width={160} height={80} className="max-h-full w-auto max-w-full object-contain" /></div>)}</div></div></section>

      <section aria-labelledby="testimonials-heading" className="py-16 md:py-20"><div className={wrap}><h2 id="testimonials-heading" className={heading}>Testimonials</h2><div tabIndex={0} aria-label="Testimonials, scroll horizontally to see more" className="mt-8 flex snap-x gap-6 overflow-x-auto pb-4 focus-visible:outline-2 focus-visible:outline-[#b61a00]">{testimonials.map(item => <blockquote key={item.name} className="w-[min(85vw,360px)] shrink-0 snap-start rounded-[20px] border border-[#b61a00] p-7"><p className="leading-relaxed">“{item.quote}”</p><footer className="mt-5"><strong>{item.name}</strong>{item.role && <span className="block text-sm">{item.role}</span>}</footer></blockquote>)}</div></div></section>

      <section aria-labelledby="blog-heading" className="bg-[#f8f8f8] py-16 md:py-20"><div className={wrap}><h2 id="blog-heading" className={heading}>Our Blog</h2><div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">{posts.map(post => <article key={post.href} className="overflow-hidden rounded-[20px] bg-white"><Link href={post.href} className="block focus-visible:outline-2 focus-visible:outline-[#b61a00]"><Image src={img(post.image)} alt="" width={300} height={200} sizes="(max-width: 767px) 90vw, 33vw" className="aspect-[3/2] w-full object-cover" /></Link><div className="p-6"><h3 className="text-xl font-semibold"><Link href={post.href} className="focus-visible:outline-2 focus-visible:outline-[#b61a00]">{post.title}</Link></h3><Link href={post.href} aria-label={`Read more about ${post.title}`} className="mt-4 inline-block text-[#b61a00] focus-visible:outline-2">Read More »</Link></div></article>)}</div></div></section>

      <section aria-labelledby="joining-heading" className="bg-[#b61a00] py-16 text-white"><div className={`${wrap} flex flex-col items-start justify-between gap-6 md:flex-row md:items-center`}><div><h2 id="joining-heading" className={heading}>Interested Joining Our Team?</h2><p className="mt-3">Join our team and take your career to new heights</p></div><Link href="/contact-us/" className="rounded-full bg-white px-8 py-4 font-semibold text-[#b61a00] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white">Contact Us</Link></div></section>

      <section aria-labelledby="contact-heading" className="py-16 md:py-20"><div className={`${wrap} grid gap-10 md:grid-cols-2`}><div><h2 id="contact-heading" className={heading}>Contact our recruitment agency for hr professionals</h2><p className="mt-4 leading-relaxed">Find the Perfect employees with JOBSHUB HR, the best HR consultancy service provider in India.</p><p className="mt-5">Call us now <a className="text-[#b61a00] underline" href="tel:+919740943402">+919740943402</a></p></div><div className="rounded-[20px] border border-[#b61a00] p-6"><h3 className="text-2xl font-semibold">Get a quote</h3><form className="mt-5"><fieldset disabled className="grid gap-4"><label>Business Email <span aria-hidden="true">*</span><input type="email" name="email" required className="mt-1 block w-full rounded border border-gray-400 p-3" /></label><label>Full Name<input type="text" name="name" className="mt-1 block w-full rounded border border-gray-400 p-3" /></label><label>Share why you are contacting<textarea name="message" rows={4} className="mt-1 block w-full rounded border border-gray-400 p-3" /></label><button type="button" disabled className="w-fit cursor-not-allowed rounded-full bg-gray-500 px-8 py-3 text-white">Submit</button></fieldset><p className="mt-4 text-sm">Online submissions are not yet available. Please call us using the number above.</p></form></div></div></section>

      <section aria-labelledby="faq-heading" className="bg-[#f8f8f8] py-16 md:py-20"><div className={wrap}><h2 id="faq-heading" className={heading}>FAQ</h2><div className="mt-8 grid gap-8 lg:grid-cols-3">{faqs.map(group => <div key={group.group}><h3 className="mb-4 text-2xl font-semibold">{group.group}</h3>{group.entries.map(([question, answer]) => <details key={question} className="border-b border-gray-300 bg-white"><summary className="cursor-pointer px-4 py-4 font-medium focus-visible:outline-2 focus-visible:outline-[#b61a00]">{question}</summary><p className="px-4 pb-4 leading-relaxed">{answer}</p></details>)}</div>)}</div></div></section>
    </>
  );
}
