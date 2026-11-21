import Link from "next/link";
import services from "./servicesContent.json";
import "./ServicesPage.css";

function ServiceSection({ service, index }) {
  function formattedText(item) {
    let position = 0;
    const result = [];
    item.bold.forEach((range, index) => {
      result.push(item.text.slice(position, range.start));
      result.push(<strong key={index}>{item.text.slice(range.start, range.end)}</strong>);
      position = range.end;
    });
    result.push(item.text.slice(position));
    return result;
  }
  return (
    <article className={`services-card${index === 0 ? " services-card-permanent" : ""}`} aria-labelledby={`service-heading-${index}`}>
      <span className="services-card-decoration" aria-hidden="true" />
      <h3 id={`service-heading-${index}`}>{service.title}</h3>
      {service.blocks.map((block, blockIndex) => {
        if (block.type === "heading") return <h4 key={blockIndex}>{block.text}</h4>;
        if (block.type === "paragraph") return <p key={blockIndex}>{block.text}</p>;
        return <ul key={blockIndex} className={block.inline ? "services-list services-list-inline" : "services-list"}>{block.items.map((item, itemIndex) => <li key={itemIndex}>{block.icon !== "none" && <svg className="services-check" viewBox="0 0 16 16" aria-hidden="true">{block.icon === "circle" ? <><circle cx="8" cy="8" r="8" fill="currentColor" /><path d="m4.1 8.1 2.4 2.4 5.1-5.1" fill="none" stroke="white" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" /></> : <path d="m2 8 4 4 8-8" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />}</svg>}<span>{formattedText(item)}</span></li>)}</ul>;
      })}
    </article>
  );
}

export default function ServicesPage() {
  return (
    <>
      <section className="services-banner">
        <div className="services-wrap services-banner-inner">
          <div><h1>Services</h1><nav aria-label="Breadcrumb"><Link href="/">Home</Link><span aria-hidden="true">»</span><span aria-current="page">Services</span></nav></div>
          <p>Premium-quality services from Bangalore&apos;s leading recruitment experts.</p>
        </div>
      </section>
      <section className="services-content" aria-labelledby="services-heading">
        <div className="services-wrap services-content-inner">
          <header className="services-intro"><h2 id="services-heading">Our Services</h2><p>This version maintains a concise and direct approach while highlighting the premier quality of the services offered in Bangalore.</p></header>
          <div className="services-layout"><ServiceSection service={services[0]} index={0} /><div className="services-remaining">{services.slice(1).map((service, index) => <ServiceSection key={service.title} service={service} index={index + 1} />)}</div></div>
        </div>
      </section>
    </>
  );
}
