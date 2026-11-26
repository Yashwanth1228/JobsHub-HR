import Image from "next/image";
import Link from "next/link";
import { clientLogos, posts, processes, services } from "./homeContent";
import FaqSections from "./FaqSections";
import TestimonialsCarousel from "./TestimonialsCarousel";
import RecruitmentIntroduction from "./RecruitmentIntroduction";
import EnquiryForm from "@/components/common/EnquiryForm";
import "./ClientsMarquee.css";

const wrap = "mx-auto max-w-[1150px] px-6 md:px-8";
const heading = "text-3xl font-semibold leading-tight md:text-4xl";
const img = (name) => `/images/home/${name}`;

function ServiceCard({ item, index }) {
  const breakAfter = index < 2 ? item.text.indexOf("? ") + 1 : index === 3 ? "Trusted by top Indian companies.".length : index === 4 ? "Build trust. Hire safely.".length : 0;
  const first = breakAfter ? item.text.slice(0, breakAfter) : item.text;
  const rest = breakAfter ? item.text.slice(breakAfter).trimStart() : "";
  return (
    <article className={`min-w-0 rounded-[20px] border border-[#333] p-[30px] md:p-[40px] ${index < 2 ? "bg-white" : "bg-transparent"}`}>
      <div aria-hidden="true" className="ml-[30px] h-[30px] w-[30px] rounded-full bg-[#b61a00]" />
      <h3 className="mt-9 text-[26px] leading-tight font-medium md:text-[28px]">{item.title}</h3>
      <div className="mt-5 text-base leading-relaxed">
        <p>{first}{index >= 3 && <><br />{rest}</>}</p>
        {index < 2 && rest && <p className="mt-4">{rest}</p>}
      </div>
    </article>
  );
}

export default function HomeSections() {
  return (
    <>
      <section aria-labelledby="process-heading" className="px-[30px] text-white">
        <div className="relative mx-auto max-w-[1140px] overflow-hidden rounded-[20px] bg-[#b61a00] p-[30px] md:p-[60px]">
          <div aria-hidden="true" className="pointer-events-none absolute -top-[20%] -left-[7%] aspect-square w-[40%] rounded-full bg-[#800e02] max-md:-top-[10%] max-md:-left-[35%] max-md:w-[85%]" />
          <div className="relative grid min-w-0 gap-10 sm:grid-cols-2 lg:grid-cols-4">
            <div className="min-w-0">
              <p className="text-[17px]">Our Process</p>
              <h2 id="process-heading" className="mt-4 text-[25px] leading-[1.15] font-normal md:text-[30px]">Our Working Process</h2>
            </div>
            {processes.map((item) => <article key={item.title} className="min-w-0">
              <Image src={img(item.image)} alt="" width={800} height={533} sizes="(max-width: 639px) 85vw, (max-width: 1023px) 42vw, 23vw" className="aspect-[3/2] w-full rounded-[10px] object-cover" />
              <h3 className="mt-5 text-[22px] leading-tight font-semibold">{item.title}</h3>
              <p className="mt-4 leading-relaxed">{item.text}</p>
            </article>)}
          </div>
        </div>
      </section>

      <section aria-labelledby="about-heading" className="py-16 text-[#303030] md:py-20">
        <div className="mx-auto grid max-w-[1140px] gap-10 px-6 lg:grid-cols-2 lg:gap-[60px] lg:px-0">
          <div className="relative mx-auto flex min-h-[440px] w-full max-w-[540px] flex-col justify-between overflow-hidden sm:min-h-[500px]">
            <Image src={img("happy-businesswoman-holding-folder-removebg-preview.png")} alt="Recruitment professional holding a folder" width={612} height={408} sizes="(max-width: 1023px) 90vw, 50vw" className="pointer-events-none absolute -right-[18%] bottom-[85px] h-auto w-full" />
            <div className="relative z-10 w-[min(50%,270px)] min-w-[155px] rounded-[20px] border border-[#b61a00] bg-white p-5 sm:p-[30px]"><h3>Employee Retention Rate</h3><p className="mt-2 leading-relaxed">85% average retention after 12 months using our solutions</p></div>
            <div className="relative z-10 my-4 flex w-fit max-w-[55%] items-center gap-2 rounded-[20px] bg-[#b61a00] px-4 py-4 text-sm font-semibold text-white sm:px-5 lg:max-w-none lg:whitespace-nowrap lg:text-base"><svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5 shrink-0 fill-current"><path d="M12 2C7 2 3 3.3 3 5s4 3 9 3 9-1.3 9-3-4-3-9-3Zm-9 5v3c0 1.7 4 3 9 3s9-1.3 9-3V7c-2 1.4-5.5 2-9 2S5 8.4 3 7Zm0 5v3c0 1.7 4 3 9 3s9-1.3 9-3v-3c-2 1.4-5.5 2-9 2s-7-.6-9-2Zm0 5v2c0 1.7 4 3 9 3s9-1.3 9-3v-2c-2 1.4-5.5 2-9 2s-7-.6-9-2Z" /></svg><span>50% increase in diverse hires</span></div>
            <div className="relative z-10 flex items-center gap-4 rounded-[20px] border border-[#333] bg-white p-5"><svg aria-hidden="true" viewBox="0 0 24 24" className="h-7 w-7 shrink-0 fill-none stroke-black" strokeWidth="2"><circle cx="12" cy="12" r="9" /><path d="M8 14c1 2 2.3 3 4 3s3-1 4-3M8.5 9h.01M15.5 9h.01" strokeLinecap="round" strokeWidth="2.5" /></svg><div><h3>Employee Satisfaction</h3><p className="mt-2 leading-relaxed">90% employee satisfaction after implementing management improvements.</p></div></div>
          </div>
          <div className="min-w-0">
            <p className="text-[24px]">About Us</p><h2 id="about-heading" className="mt-2 text-[30px] leading-[1.2] font-normal tracking-[-1px] md:text-[40px] md:tracking-[-2px]">We are top and best recruitment agency in Bangalore</h2>
            <div className="mt-7 space-y-4 leading-relaxed">
              <p>JobsHub HR provides comprehensive HR solutions designed to help businesses build a skilled, productive, and engaged workforce. As a top recruitment agency in Bangalore, we offer professional services including recruitment, staffing, payroll management, HR compliance, and employee relations.</p>
              <p>Moreover, our HR solutions include developing and implementing effective HR policies and procedures, managing employee benefits, and supporting businesses in handling employee-related matters. In addition, we help companies streamline their HR processes while maintaining compliance with applicable labour laws and regulations.</p>
              <p>With a professional and client-focused approach, JobsHub HR supports businesses in managing their workforce efficiently and achieving their long-term HR goals. As a best recruitment agency in Bangalore, we provide reliable and customized HR solutions to meet the unique staffing needs of businesses. Therefore, our end-to-end HR services offer professional support for recruitment, staffing, and overall workforce management.</p>
              <ul className="grid gap-x-5 gap-y-4 pt-3 sm:grid-cols-2">{["Insightful analytics", "Smarter strategies", "Actionable outcomes", "Informed growth"].map(x => <li key={x} className="flex items-center gap-2"><span aria-hidden="true" className="text-xl font-bold text-black">✔</span>{x}</li>)}</ul>
            </div>
          </div>
        </div>
      </section>

      <RecruitmentIntroduction />

      <section aria-labelledby="services-heading" className="relative my-[50px] bg-white px-[30px] py-10 text-[#303030]">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[url('/images/home/Pattern-2-Convertido.png')] bg-center bg-repeat opacity-10 [background-size:50%_auto]" />
        <div className="relative mx-auto max-w-[1100px]"><h2 id="services-heading" className={`${heading} text-center`}>Our Services</h2>
          <p className="mx-auto mt-4 max-w-[600px] text-center leading-relaxed">At JOBSHUB HR, we provide a full range of HR services for companies in Bangalore. As a trusted recruitment agency in Bangalore, we deliver smart and efficient staffing solutions that help your business grow with the right people.</p>
          <div className="mt-10 grid gap-10 md:grid-cols-2">{services.slice(0, 2).map((item, index) => <ServiceCard key={item.title} item={item} index={index} />)}</div>
          <div className="mt-10 grid gap-[10px] md:grid-cols-3">{services.slice(2).map((item, index) => <ServiceCard key={item.title} item={item} index={index + 2} />)}</div>
        </div>
      </section>

      <section aria-labelledby="ceo-heading" className="px-[30px] py-[50px] text-[#313131]">
        <div className="mx-auto grid max-w-[1140px] items-center gap-5 min-[768px]:gap-10 min-[1025px]:grid-cols-2 min-[1025px]:gap-[120px]">
          <div className="min-w-0">
            <h2 id="ceo-heading" className="text-[28px] leading-tight font-normal md:text-[33px]">CEO OF JobsHub HR</h2>
            <p className="mt-2 text-[18px] leading-[1.2] font-normal tracking-[0.4px] min-[768px]:text-[33px] min-[1025px]:text-[40px] min-[1025px]:tracking-[-2px]">Manjula Krishnamurthy</p>
            <p className="mt-7 leading-6">Manjula Krishna Murthy, a forward-thinking leader and CEO of JobsHub HR, is dedicated to transforming HR solutions. Her strategic vision and unwavering commitment to excellence have played a pivotal role in establishing JobsHub HR as a respected leader in the industry. Manjula’s dedication to fostering talent and innovation continues to drive JobsHub HR success in the dynamic HR landscape.</p>
          </div>
          <div className="min-w-0 min-[1025px]:flex min-[1025px]:justify-center"><Image src={img("ceo-new.jpeg")} alt="Manjula Krishnamurthy" width={700} height={700} sizes="(max-width: 767px) 50vw, (max-width: 1024px) 75vw, 35vw" className="h-auto w-1/2 rounded-[15px] min-[768px]:w-3/4" /></div>
        </div>
      </section>

      <section aria-labelledby="clients-heading" className="bg-white px-[30px] py-16"><div className="mx-auto max-w-[1140px]"><h2 id="clients-heading" className="text-3xl font-medium text-[#313131] md:text-[32px]">Our Clients</h2><div className="clients-marquee-viewport mt-12 overflow-hidden" tabIndex={0} aria-label="Client logos"><div className="clients-marquee-track flex w-max flex-nowrap">{[false, true].map((duplicate) => <div key={String(duplicate)} aria-hidden={duplicate ? "true" : undefined} className={`clients-marquee-group flex w-max shrink-0 flex-nowrap${duplicate ? " clients-marquee-duplicate" : ""}`}>{clientLogos.map((logo, index) => <div key={logo} className="clients-marquee-logo flex shrink-0"><Image src={img(logo)} alt={duplicate ? "" : `Client logo ${index + 1}`} width={275} height={138} /></div>)}</div>)}</div></div></div></section>

      <TestimonialsCarousel />

      <section aria-labelledby="blog-heading" className="bg-[#f8f8f8] py-16 md:py-20"><div className={wrap}><h2 id="blog-heading" className={heading}>Our Blog</h2><div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">{posts.map(post => <article key={post.href} className="overflow-hidden rounded-[20px] bg-white"><Link href={post.href} className="block focus-visible:outline-2 focus-visible:outline-[#b61a00]"><Image src={img(post.image)} alt="" width={300} height={200} sizes="(max-width: 767px) 90vw, 33vw" className="aspect-[3/2] w-full object-cover" /></Link><div className="p-6"><h3 className="text-xl font-semibold"><Link href={post.href} className="focus-visible:outline-2 focus-visible:outline-[#b61a00]">{post.title}</Link></h3><Link href={post.href} aria-label={`Read more about ${post.title}`} className="mt-4 inline-block text-[#b61a00] focus-visible:outline-2">Read More »</Link></div></article>)}</div></div></section>

      <section aria-labelledby="joining-heading" className="bg-white px-6 pt-12 pb-8 md:px-8 md:pt-16 md:pb-10">
        <div className="relative mx-auto flex min-h-[200px] max-w-[1140px] flex-col items-start justify-center gap-8 overflow-hidden rounded-[20px] bg-[#b61a00] px-8 py-10 text-white md:min-h-[200px] md:flex-row md:items-center md:justify-between md:px-[50px]">
          <span aria-hidden="true" className="pointer-events-none absolute -right-16 top-1/2 h-[360px] w-[360px] -translate-y-1/2 rounded-full bg-black/[0.03]" />
          <div className="relative">
            <h2 id="joining-heading" className="text-3xl leading-tight font-normal md:text-[33px]">Interested Joining Our Team?</h2>
            <p className="mt-5">Join our team and take your career to new heights</p>
          </div>
          <Link href="/contact-us/" className="relative inline-flex shrink-0 items-center gap-4 rounded-full border border-[#313131] bg-white px-[30px] py-[15px] font-normal text-black focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white">Contact Us <svg aria-hidden="true" width="12" height="16" viewBox="0 0 12 16" fill="none"><path d="m3 2 6 6-6 6" stroke="#b61a00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg></Link>
        </div>
      </section>

      <section aria-labelledby="contact-heading" className="py-10 md:pt-12 md:pb-5">
        <div className="mx-auto grid max-w-[1200px] items-center gap-10 px-6 md:grid-cols-[minmax(0,1fr)_minmax(0,1.08fr)] md:gap-10 md:px-8">
          <div className="min-w-0">
            <h2 id="contact-heading" className="text-3xl leading-tight font-medium text-[#313131] md:text-[33px]">Contact our recruitment agency for hr professionals</h2>
            <p className="mt-7 leading-relaxed">Find the Perfect employees with JOBSHUB HR, the best HR consultancy service provider in India.</p>
            <a href="tel:+919740943402" className="mt-8 inline-flex items-center gap-[15px] rounded-[10px] bg-[#b61a00] px-[25px] py-[15px] text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#b61a00]">
              <svg aria-hidden="true" viewBox="0 0 32 32" className="h-10 w-10 shrink-0" fill="none"><path fill="currentColor" d="M8.6 3.6 11.4 3l2.1 6-2.4 1.8a20 20 0 0 0 5.9 5.9l1.8-2.4 6 2.1-.6 2.8c-.4 1.8-2.1 3-3.9 2.7C12 20.5 5.5 14 4.9 7.5c-.2-1.8 1-3.5 3.7-3.9Z"/><path d="M20 5.5a6 6 0 0 1 4.5 6M22.5 2.5a10 10 0 0 1 5 9.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
              <span><span className="block">Call us now</span><span className="block">+919740943402</span></span>
            </a>
          </div>
          <div className="min-w-0 rounded-[25px] border border-[#313131] p-6 sm:p-10 lg:p-[60px]">
            <EnquiryForm type="quote" enabled={process.env.NODE_ENV === 'development' && process.env.ENQUIRIES_LOCAL_TEST === 'true' && process.env.ENQUIRIES_WORDPRESS_ORIGIN === 'https://jobshubhr-test.local'} />
          </div>
        </div>
      </section>

      <FaqSections />
      <section className="bg-white py-5">
        <div className="mx-auto max-w-[1200px] space-y-4 px-6 text-base leading-6 font-normal text-[#313131] md:px-[30px]">
          <p>As a top recruitment agency in Bangalore, we focus on connecting businesses with the right talent at the right time. Companies across different industries trust us because we understand their needs and deliver results. Over the years, we have also become known as the top recruitment agency in Bangalore for the retail industry, helping stores and brands hire professionals who can manage sales, customer service, and operations with ease.</p>
          <p>In addition, our role as a top manpower consultant allows us to provide both permanent and temporary staffing support. We also serve as a manufacturing units employment agency in Bangalore, supplying skilled workers, supervisors, and technicians who keep production running smoothly.</p>
          <p>Many organizations regard us as the best recruitment agency in Bangalore because of our transparent process and reliable service. At the same time, as an HR agency for the healthcare industry, we help hospitals and clinics find doctors, nurses, and support staff who ensure quality patient care.</p>
        </div>
      </section>
    </>
  );
}
