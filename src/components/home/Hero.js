import Image from "next/image";
import Link from "next/link";

function PeopleVisual() {
  return (
    <div className="relative mx-auto flex aspect-square w-full max-w-[500px] items-end justify-center md:mt-[60px]">
      <div aria-hidden="true" className="absolute inset-0 rounded-full bg-[#b61a00]" />
      <Image
        src="/images/hero/hero-imgs-Arrows-CF.png"
        alt="Two recruitment professionals"
        width={811}
        height={522}
        priority
        className="relative z-10 mb-[16%] h-auto w-[88%]"
        sizes="(max-width: 767px) 90vw, (max-width: 1024px) 50vw, 40vw"
      />
      <Link href="/about-us/" aria-label="About Us" className="absolute right-0 top-0 z-20 hidden w-[40%] max-w-[190px] rounded-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#b61a00] md:-top-[18%] md:-right-[10%] md:block">
        <svg aria-hidden="true" viewBox="0 0 200 200" className="w-full rotate-45 fill-black text-[18px] font-bold uppercase">
          <defs><path id="hero-about-circle" d="M 100,100 m -76,0 a 76,76 0 1,1 152,0 a 76,76 0 1,1 -152,0" /></defs>
          <text><textPath href="#hero-about-circle">○ About Us ○ About Us ○ About Us ○ About Us</textPath></text>
        </svg>
      </Link>
    </div>
  );
}

export default function Hero() {
  return (
    <section aria-labelledby="hero-heading" className="relative overflow-hidden bg-white px-[30px] pt-[60px] text-[#303030] min-[1025px]:px-5 min-[1025px]:pt-[90px]">
      <div aria-hidden="true" className="pointer-events-none absolute right-0 top-0 h-[200px] w-[200px] opacity-5 min-[1025px]:top-[6vh] min-[1025px]:w-[15%] min-[1025px]:max-w-[260px]">
        <Image src="/images/hero/shape-3.png" alt="" fill sizes="260px" className="object-contain object-top" />
      </div>
      <div className="relative mx-auto max-w-[1440px]">
        <h1 id="hero-heading" className="max-w-[1150px] text-center text-[20px] leading-[1.3] font-semibold tracking-[0.9px] md:text-left md:text-[35px] md:leading-tight md:tracking-normal">
          BANGALORE’S TRUSTED RECRUITMENT AGENCY FOR END-TO-END HR SERVICES
        </h1>
        <div className="mt-6 grid items-start gap-8 md:grid-cols-[minmax(0,1.15fr)_minmax(0,1.4fr)_minmax(0,0.95fr)] md:gap-5 min-[1025px]:gap-8">
          <div className="min-w-0 text-center md:text-left">
            <p className="text-[18px] leading-[1.4] md:text-[clamp(18px,2.1vw,28px)] md:leading-tight">Explore our user-friendly interface designed to streamline your job search or recruitment process.</p>
            <Link href="/contact-us/" className="mt-5 inline-flex min-h-12 w-full max-w-[200px] items-center justify-center rounded-full bg-[#b61a00] px-8 py-4 font-medium text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#b61a00] min-[1025px]:py-6">Get it now</Link>
          </div>
          <div className="order-3 md:order-2"><PeopleVisual /></div>
          <div className="order-2 flex min-w-0 flex-col gap-7 text-center md:order-3 md:text-right">
            <h2 className="text-[18px] leading-tight font-semibold md:text-[clamp(19px,2.2vw,30px)]">We are top and best recruitment agency</h2>
            <Image src="/images/hero/happy-businesswoman-holding-folder-scaled.jpg" alt="Recruitment professional holding a folder" width={2560} height={1707} sizes="(max-width: 767px) 90vw, 25vw" className="h-[259px] w-full rounded-[20px] object-cover md:aspect-[325/291] md:h-auto" />
            <p className="text-[15px] leading-[22px] md:text-left"><strong>Fraud alert:</strong><br />We JOBSHUB HR don&apos;t charge candidates for placement.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
