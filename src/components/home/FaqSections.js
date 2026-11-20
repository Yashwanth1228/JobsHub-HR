import Image from "next/image";
import { faqs } from "./homeContent";
import "./FaqSections.css";

const imageGroups = [
  ["/images/home/two-indian-business-man-suits-sitting-office-cafe-looking-laptop-drinking-coffee-scaled.jpg", "/images/faq/img1.webp", "/images/faq/img2.webp"],
  ["/images/home/reading-data-scaled.jpg", "/images/faq/img1.webp", "/images/faq/day-office-travel-agency-scaled.jpg"],
  ["/images/faq/college-mates-studying-together-scaled.jpg", "/images/faq/business-job-interview-concept-scaled.jpg", "/images/faq/img2.webp"],
];

function FaqSection({ group, index }) {
  return (
    <section className={`homepage-faq${index === 1 ? " homepage-faq-reversed" : ""}`} aria-labelledby={`homepage-faq-group-${index}`}>
      <div className="homepage-faq-inner">
        <div className="homepage-faq-content">
          <p className="homepage-faq-label">FAQ</p>
          <h2 id={`homepage-faq-group-${index}`}>{group.group}</h2>
          <div className="homepage-faq-list">
            {group.entries.map(([question, answer], itemIndex) => (
              <details key={question} name={`homepage-faq-${index}`} open={itemIndex === 0}>
                <summary><span>{question}</span><span className="homepage-faq-icon" aria-hidden="true" /></summary>
                <p>{answer}</p>
              </details>
            ))}
          </div>
        </div>
        <div className={`homepage-faq-images${index !== 1 ? " homepage-faq-images-yellow" : ""}`} aria-hidden="true">
          {imageGroups[index].map((src, imageIndex) => (
            <div className="homepage-faq-image" key={src}>
              <Image src={src} alt="" fill sizes="(max-width: 767px) 85vw, 40vw" style={{ objectFit: "cover", objectPosition: imageIndex === 0 ? "top center" : "center" }} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function FaqSections() {
  return faqs.map((group, index) => <FaqSection key={group.group} group={group} index={index} />);
}
