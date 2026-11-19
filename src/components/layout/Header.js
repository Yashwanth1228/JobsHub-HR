"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import logo from "../../../public/images/jobshubhr-logo.jpeg";

const links = [
  ["Home", "/"],
  ["About Us", "/about-us/"],
  ["Services", "/services/"],
  ["Our Blog", "/top-recruitment-agency-in-bangalore/"],
  ["Contact Us", "/contact-us/"],
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const currentPath = (pathname || "/").replace(/\/+$/, "") || "/";

  function navigation(mobile = false) {
    return links.map(([label, href]) => {
      const active = currentPath === (href.replace(/\/+$/, "") || "/");
      return (
        <Link
          key={href}
          href={href}
          aria-current={active ? "page" : undefined}
          onClick={() => setOpen(false)}
          className={`${mobile ? "block px-6 py-5" : "flex h-full items-center border-b-4 px-3"} ${active ? "border-b-4 border-b-[#b51b06]" : mobile ? "border-b border-b-[#333]" : "border-b-transparent"} focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-blue-700`}
        >
          {label}
        </Link>
      );
    });
  }

  return (
    <header className="sticky top-0 z-50 border-b border-[#333] bg-white text-black">
      <div className="flex min-h-24 items-stretch xl:min-h-[85px]">
        <Link href="/" aria-label="JobsHub HR home" onClick={() => setOpen(false)} className="flex w-1/2 items-center justify-start border-r border-[#333] px-4 focus-visible:outline-2 focus-visible:outline-blue-700 sm:w-1/4 sm:justify-center xl:w-[23.7%]">
          <Image src={logo} alt="JobsHub HR" priority className="h-auto w-28 max-w-full xl:-translate-x-8" />
        </Link>
        <nav aria-label="Main navigation" className="hidden flex-1 items-center justify-evenly border-r border-[#333] xl:flex xl:px-8">
          {navigation()}
        </nav>
        <div className="flex flex-1 items-center justify-end gap-5 px-4 sm:gap-10 sm:px-8 xl:w-[22.7%] xl:flex-none xl:justify-center xl:px-4">
          <a href="tel:+919740943402" className="hidden items-center gap-3 rounded-xl bg-[#b51b06] px-5 py-3 text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700 sm:flex xl:gap-2 xl:px-4 xl:py-2 xl:text-sm">
            <svg aria-hidden="true" viewBox="0 0 24 24" className="h-6 w-6 fill-current"><path d="M6.6 2.7 9 2l2.1 5-1.7 1.4a15.8 15.8 0 0 0 6.2 6.2l1.4-1.7 5 2.1-.7 2.4c-.4 1.5-1.8 2.6-3.4 2.4C10.4 19 5 13.6 4.2 6.1 4 4.5 5.1 3.1 6.6 2.7Z" /></svg>
            <span><span className="block">Call us now</span><span className="block">+919740943402</span></span>
          </a>
          <button type="button" aria-expanded={open} aria-controls="responsive-navigation" aria-label={open ? "Close menu" : "Open menu"} onClick={() => setOpen(!open)} className="flex h-12 w-12 items-center justify-center focus-visible:outline-2 focus-visible:outline-blue-700 xl:hidden">
            {open ? <svg aria-hidden="true" viewBox="0 0 24 24" className="h-8 w-8" fill="none" stroke="currentColor" strokeWidth="3"><path d="M5 5l14 14M19 5 5 19" /></svg> : <svg aria-hidden="true" viewBox="0 0 24 24" className="h-8 w-8" fill="none" stroke="currentColor" strokeWidth="3"><path d="M3 5h18M3 12h18M3 19h18" /></svg>}
          </button>
        </div>
      </div>
      <nav id="responsive-navigation" aria-label="Responsive navigation" hidden={!open} className="max-h-[calc(100dvh-6rem)] overflow-y-auto border-t border-[#333] xl:hidden">
        {navigation(true)}
      </nav>
    </header>
  );
}
